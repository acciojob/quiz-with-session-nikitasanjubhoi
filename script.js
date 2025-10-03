const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// ✅ Load previous answers from sessionStorage (or initialize)
let userAnswers = [];
const savedProgress = sessionStorage.getItem("progress");
if (savedProgress) {
  userAnswers = JSON.parse(savedProgress);
} else {
  userAnswers = new Array(questions.length).fill(null);
}

// ✅ Display questions and restore selections
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionWrapper = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionWrapper.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceId = `q${i}-choice${j}`;

      const label = document.createElement("label");
      label.setAttribute("for", choiceId);

      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      choiceElement.setAttribute("id", choiceId);

      // ✅ Restore selection
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
        choiceElement.setAttribute("checked", "true"); // ✅ For Cypress
      }

      // ✅ Update sessionStorage on change
      choiceElement.addEventListener("change", function () {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionWrapper.appendChild(label);
      questionWrapper.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionWrapper);
  }
}

// ✅ Submit logic
submitButton.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  const resultText = `Your score is ${score} out of ${questions.length}.`;
  scoreElement.textContent = resultText;

  // ✅ Store in localStorage
  localStorage.setItem("score", score.toString());
});

// ✅ Load score from localStorage (if any)
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// ✅ Initial render
renderQuestions();
