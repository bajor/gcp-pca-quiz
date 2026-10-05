# Google Cloud Professional Cloud Architect Quiz

[Open the quiz](https://bajor.github.io/gcp-pca-quiz/)

A dependency-free, static practice quiz for the Google Cloud Certified Professional Cloud Architect (PCA) exam. It has 130 original, scenario-based questions, including 80 advanced multi-constraint scenarios tagged `advanced`. Every question has exactly four choices, an explanation for every choice, and a link to the relevant official Google Cloud documentation.

This is a study aid, not an official Google exam product. It is not affiliated with or endorsed by Google.

## Coverage

The question bank follows the six capability areas listed on the [official Professional Cloud Architect certification page](https://cloud.google.com/learn/certification/cloud-architect).

| Exam capability area | Questions |
| --- | ---: |
| Design and plan a cloud solution architecture | 32 |
| Manage and provision cloud solution infrastructure | 20 |
| Design for security and compliance | 25 |
| Analyze and optimize technical and business processes | 21 |
| Manage implementations of cloud architecture | 13 |
| Ensure solution and operations excellence | 19 |
| **Total** | **130** |

## Sources and attribution

Question scenarios and explanations are original. The factual claims are sourced from official Google Cloud documentation, including the Professional Cloud Architect certification page. Google Cloud documentation content is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), unless otherwise noted by Google.

Each question includes source metadata in `question-bank/`. The required `commit` field records the documentation access date because Google Cloud documentation pages do not expose a source-control revision in the quiz UI.

## Local use

Open `index.html` in a browser. There is no build step, backend, or runtime dependency. The quiz stores progress only in the current browser's local storage.

Keyboard shortcuts:

- `1` through `4`: choose an answer.
- `Enter`: continue after answering.

## Validation

Run these commands after changing question data or its schema:

```sh
node scripts/validate-question-bank.js
node --test tests/question-schema.test.js
```

## Question bank contract

Each question must have a unique ID and prompt, exactly four distinct choices, an explanation for each choice, at least one tag, and complete source metadata.

```js
{
  id: "unique-question-id",
  prompt: "Question text",
  answers: [
    { text: "Answer A", explanation: "Why this choice is correct or incorrect." },
    { text: "Answer B", explanation: "Why this choice is correct or incorrect." },
    { text: "Answer C", explanation: "Why this choice is correct or incorrect." },
    { text: "Answer D", explanation: "Why this choice is correct or incorrect." }
  ],
  correct: 0,
  tags: ["topic"],
  source: {
    name: "Source name",
    url: "https://example.com/source",
    commit: "source revision or access date",
    license: "license name"
  }
}
```

The browser validates the complete bank before starting. Invalid data prevents the quiz from starting and writes validation errors to the browser console.
