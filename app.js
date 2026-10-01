(function () {
  "use strict";

  const STORAGE_KEY = "professionalCloudArchitectQuizProgress.v1";
  const state = {
    questions: [],
    deck: [],
    index: 0,
    current: null,
    selected: false,
    sessionAttempts: 0,
    sessionCorrect: 0,
    progress: loadProgress()
  };

  const elements = {
    questionCount: document.getElementById("question-count"),
    score: document.getElementById("score"),
    emptyState: document.getElementById("empty-state"),
    emptyStateTitle: document.getElementById("empty-state-title"),
    emptyStateCopy: document.getElementById("empty-state-copy"),
    quizPanel: document.getElementById("quiz-panel"),
    prompt: document.getElementById("prompt"),
    answers: document.getElementById("answers"),
    explanations: document.getElementById("explanations"),
    source: document.getElementById("question-source"),
    nextButton: document.getElementById("next-button"),
    resetButton: document.getElementById("reset-button"),
    bankStatus: document.getElementById("bank-status")
  };

  init();

  function init() {
    state.questions = globalThis.PCA_QUIZ_QUESTIONS || [];
    const validationErrors = globalThis.PCA_QUESTION_SCHEMA.validateQuestionBank(state.questions);
    if (validationErrors.length > 0) {
      console.error("Question bank validation failed:", validationErrors);
      elements.bankStatus.textContent = "Question bank validation failed. See the browser console for details.";
      return;
    }

    bindEvents();
    rebuildDeck();
    elements.bankStatus.textContent = state.questions.length === 0
      ? "Question bank is empty."
      : `${state.questions.length} questions loaded. Progress is stored in this browser only.`;
  }

  function bindEvents() {
    elements.nextButton.addEventListener("click", showNextQuestion);
    elements.resetButton.addEventListener("click", resetProgress);
    document.addEventListener("keydown", handleKeydown);
  }

  function loadProgress() {
    const fallback = { totalAttempts: 0, correctCount: 0 };
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...fallback, ...JSON.parse(stored) } : fallback;
    } catch (error) {
      console.warn("Could not read quiz progress. Starting with empty progress.", error);
      return fallback;
    }
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  }

  function resetProgress() {
    if (!confirm("Reset all stored quiz progress?")) {
      return;
    }

    state.progress = { totalAttempts: 0, correctCount: 0 };
    state.sessionAttempts = 0;
    state.sessionCorrect = 0;
    saveProgress();
    rebuildDeck();
  }

  function rebuildDeck() {
    state.deck = [...state.questions];
    shuffle(state.deck);
    state.index = 0;
    renderDeckState();
  }

  function renderDeckState() {
    if (state.deck.length === 0) {
      state.current = null;
      elements.quizPanel.hidden = true;
      elements.emptyState.hidden = false;
      elements.questionCount.textContent = "Question 0 / 0";
      updateEmptyState();
      updateScore();
      return;
    }

    elements.quizPanel.hidden = false;
    elements.emptyState.hidden = true;
    showQuestion(state.deck[state.index]);
  }

  function updateEmptyState() {
    elements.emptyStateTitle.textContent = "No questions yet.";
    elements.emptyStateCopy.textContent = "Only four-choice questions with explanations for every option are included.";
  }

  function showQuestion(question) {
    state.current = prepareQuestion(question);
    state.selected = false;
    elements.questionCount.textContent = `Question ${state.index + 1} / ${state.deck.length}`;
    elements.prompt.textContent = question.prompt;
    elements.explanations.hidden = true;
    elements.explanations.replaceChildren();
    renderSource(question.source);
    elements.nextButton.disabled = true;
    elements.answers.replaceChildren();

    state.current.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.dataset.index = String(index);
      button.innerHTML = `<span class="answer-key">${index + 1}</span>${escapeHtml(answer.text)}`;
      button.addEventListener("click", () => chooseAnswer(index));
      elements.answers.append(button);
    });

    updateScore();
  }

  function prepareQuestion(question) {
    const answers = question.answers.map((answer, index) => ({ ...answer, correct: index === question.correct }));
    shuffle(answers);
    return { ...question, answers, correct: answers.findIndex((answer) => answer.correct) };
  }

  function chooseAnswer(index) {
    if (!state.current || state.selected) {
      return;
    }

    state.selected = true;
    const correct = index === state.current.correct;
    state.sessionAttempts += 1;
    if (correct) {
      state.sessionCorrect += 1;
    }
    recordProgress(correct);

    [...elements.answers.children].forEach((button, buttonIndex) => {
      button.disabled = true;
      if (buttonIndex === state.current.correct) {
        button.classList.add("correct");
      } else if (buttonIndex === index) {
        button.classList.add("incorrect");
      }
    });

    renderExplanations(state.current.answers);
    elements.explanations.hidden = false;
    elements.nextButton.disabled = false;
    elements.nextButton.focus();
    updateScore();
  }

  function recordProgress(correct) {
    state.progress.totalAttempts += 1;
    if (correct) {
      state.progress.correctCount += 1;
    }
    saveProgress();
  }

  function showNextQuestion() {
    if (!state.current || !state.selected) {
      return;
    }

    state.index = (state.index + 1) % state.deck.length;
    showQuestion(state.deck[state.index]);
  }

  function handleKeydown(event) {
    if (typeof event.target.matches === "function" && event.target.matches("input, select, textarea, button")) {
      return;
    }

    if (["1", "2", "3", "4"].includes(event.key)) {
      chooseAnswer(Number(event.key) - 1);
    }
    if (event.key === "Enter" && !elements.nextButton.disabled) {
      showNextQuestion();
    }
  }

  function updateScore() {
    elements.score.textContent = `Score: ${state.sessionCorrect} / ${state.sessionAttempts}`;
  }

  function renderSource(source) {
    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = source.name;
    elements.source.replaceChildren("Source: ", link);
  }

  function renderExplanations(answers) {
    answers.forEach((answer, index) => {
      const item = document.createElement("section");
      item.className = `option-explanation ${answer.correct ? "correct" : "incorrect"}`;

      const title = document.createElement("p");
      title.className = "option-explanation-title";
      title.textContent = `${answer.correct ? "Correct" : "Incorrect"} choice ${index + 1}: ${answer.text}`;

      const copy = document.createElement("p");
      copy.textContent = answer.explanation;
      item.append(title, copy);
      elements.explanations.append(item);
    });
  }

  function shuffle(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [items[index], items[target]] = [items[target], items[index]];
    }
    return items;
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;"
    })[character]);
  }
})();
