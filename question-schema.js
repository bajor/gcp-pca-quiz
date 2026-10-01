(function () {
  "use strict";

  const REQUIRED_FIELDS = ["id", "prompt", "answers", "correct", "tags", "source"];
  const SOURCE_FIELDS = ["name", "url", "commit", "license"];

  function validateQuestionBank(questions) {
    if (!Array.isArray(questions)) {
      return ["Question bank must be an array."];
    }

    const errors = [];
    const ids = new Set();
    const prompts = new Set();

    questions.forEach((question, index) => {
      const label = question && typeof question.id === "string" ? question.id : `Question ${index + 1}`;
      if (!question || typeof question !== "object") {
        errors.push(`${label} must be an object.`);
        return;
      }

      REQUIRED_FIELDS.forEach((field) => {
        if (!(field in question)) {
          errors.push(`${label} is missing required field: ${field}.`);
        }
      });

      if (!isNonEmptyString(question.id)) {
        errors.push(`${label} must have a non-empty id.`);
      } else if (ids.has(question.id)) {
        errors.push(`Duplicate question id: ${question.id}.`);
      } else {
        ids.add(question.id);
      }

      if (!isNonEmptyString(question.prompt)) {
        errors.push(`${label} must have a non-empty prompt.`);
      } else if (prompts.has(question.prompt)) {
        errors.push(`Duplicate prompt: ${question.prompt}.`);
      } else {
        prompts.add(question.prompt);
      }

      validateAnswers(question, label, errors);

      if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct > 3) {
        errors.push(`${label} has invalid correct answer index: ${question.correct}.`);
      }

      if (!Array.isArray(question.tags) || question.tags.length === 0 || question.tags.some((tag) => !isNonEmptyString(tag))) {
        errors.push(`${label} must have at least one non-empty tag.`);
      }
      validateSource(question.source, label, errors);
    });

    return errors;
  }

  function validateAnswers(question, label, errors) {
    if (!Array.isArray(question.answers) || question.answers.length !== 4) {
      errors.push(`${label} must have exactly 4 answers.`);
      return;
    }

    const texts = question.answers.map((answer) => answer && typeof answer === "object" ? answer.text : "");
    if (texts.some((text) => !isNonEmptyString(text))) {
      errors.push(`${label} has an empty or invalid answer.`);
    } else if (new Set(texts.map((text) => text.toLowerCase())).size !== 4) {
      errors.push(`${label} has duplicate answers.`);
    }

    if (question.answers.some((answer) => !answer || typeof answer !== "object" || !isNonEmptyString(answer.explanation))) {
      errors.push(`${label} must explain every answer option.`);
    }
  }

  function validateSource(source, label, errors) {
    if (!source || typeof source !== "object") {
      errors.push(`${label} must have source metadata.`);
      return;
    }

    SOURCE_FIELDS.forEach((field) => {
      if (!isNonEmptyString(source[field])) {
        errors.push(`${label} has invalid source ${field}.`);
      }
    });

    if (isNonEmptyString(source.url) && !isHttpUrl(source.url)) {
      errors.push(`${label} source URL must use HTTP or HTTPS.`);
    }
  }

  function isNonEmptyString(value) {
    return typeof value === "string" && value.trim() !== "";
  }

  function isHttpUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  globalThis.PCA_QUESTION_SCHEMA = { validateQuestionBank };
})();
