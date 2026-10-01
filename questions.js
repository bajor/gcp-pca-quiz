(function () {
  "use strict";

  const banks = [
    globalThis.PCA_QUIZ_ARCHITECTURE_QUESTIONS,
    globalThis.PCA_QUIZ_INFRASTRUCTURE_QUESTIONS,
    globalThis.PCA_QUIZ_SECURITY_QUESTIONS,
    globalThis.PCA_QUIZ_OPERATIONS_QUESTIONS,
    globalThis.PCA_QUIZ_IMPLEMENTATION_QUESTIONS,
    globalThis.PCA_QUIZ_RELIABILITY_QUESTIONS
  ];

  globalThis.PCA_QUIZ_QUESTIONS = banks.every(Array.isArray) ? banks.flat() : [];
})();
