"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

require("../question-schema.js");

const { validateQuestionBank } = globalThis.PCA_QUESTION_SCHEMA;

function createQuestion() {
  return {
    id: "complete-question",
    prompt: "Which answer is correct?",
    answers: [
      { text: "Answer A", explanation: "Incorrect because A is not correct." },
      { text: "Answer B", explanation: "Correct because B is correct." },
      { text: "Answer C", explanation: "Incorrect because C is not correct." },
      { text: "Answer D", explanation: "Incorrect because D is not correct." }
    ],
    correct: 1,
    tags: ["test"],
    source: {
      name: "Test source",
      url: "https://example.com/questions",
      commit: "accessed-2026-10-01",
      license: "CC BY 4.0"
    }
  };
}

test("accepts a complete source-attributed question", () => {
  assert.deepEqual(validateQuestionBank([createQuestion()]), []);
});

test("rejects a choice without an explanation", () => {
  const question = createQuestion();
  question.answers[2].explanation = "";

  assert.match(validateQuestionBank([question]).join("\n"), /must explain every answer option/);
});

test("rejects a question with fewer than four choices", () => {
  const question = createQuestion();
  question.answers.pop();

  assert.match(validateQuestionBank([question]).join("\n"), /must have exactly 4 answers/);
});
