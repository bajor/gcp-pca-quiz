"use strict";

require("../question-schema.js");
require("../question-bank/sources.js");
require("../question-bank/architecture.js");
require("../question-bank/infrastructure.js");
require("../question-bank/security.js");
require("../question-bank/operations.js");
require("../question-bank/implementation.js");
require("../question-bank/reliability.js");
require("../questions.js");

const questions = globalThis.PCA_QUIZ_QUESTIONS;
const errors = globalThis.PCA_QUESTION_SCHEMA.validateQuestionBank(questions);

if (errors.length > 0) {
  throw new Error(`Question bank validation failed:\n${errors.join("\n")}`);
}

console.log(`Question bank validation passed for ${questions.length} questions.`);
