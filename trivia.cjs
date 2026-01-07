console.log("Game started");
const readline = require("readline");

/* ==============================
   CLI SETUP
================================ */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/* ==============================
   QUESTIONS ARRAY
   (Uses array data structure)
================================ */
const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which keyword creates a constant in JavaScript?",
    options: ["var", "let", "const", "define"],
    answer: "const",
  },
];

/* ==============================
   GAME STATE
================================ */
let currentIndex = 0;
let score = 0;
const TIME_LIMIT = 8; // seconds per question

/* ==============================
   FUNCTION: ASK QUESTION
   - Uses timers (async JS)
   - Uses array iteration (map)
================================ */
function askQuestion() {
  const current = questions[currentIndex];

  console.clear();
  console.log(`🧠 Question ${currentIndex + 1}/${questions.length}`);
  console.log(current.question);

  // Array iteration method: map
  current.options.map((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });

  let timeLeft = TIME_LIMIT;

  const timer = setInterval(() => {
    process.stdout.write(`\r⏱️ Time left: ${timeLeft}s `);
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      console.log("\n⏰ Time's up!");
      nextQuestion();
    }
  }, 1000);

  rl.question("\nYour answer (1-4): ", (input) => {
    clearInterval(timer);

    const userChoice = current.options[Number(input) - 1];

    if (userChoice === current.answer) {
      console.log("✅ Correct!");
      score++;
    } else {
      console.log(`❌ Wrong! Correct answer: ${current.answer}`);
    }

    setTimeout(nextQuestion, 1500);
  });
}

/* ==============================
   FUNCTION: NEXT QUESTION
   - Uses conditional logic
================================ */
function nextQuestion() {
  currentIndex++;

  if (currentIndex < questions.length) {
    askQuestion();
  } else {
    endGame();
  }
}

/* ==============================
   FUNCTION: END GAME
   - Uses array iteration (reduce)
================================ */
function endGame() {
  console.clear();
  console.log("🎉 Quiz Finished!");

  const totalQuestions = questions.length;

  // Array iteration method: reduce
  const percentage = questions.reduce(() => {
    return Math.round((score / totalQuestions) * 100);
  }, 0);

  console.log(`✔️ Correct Answers: ${score}`);
  console.log(`❌ Incorrect Answers: ${totalQuestions - score}`);
  console.log(`📊 Score Percentage: ${percentage}%`);

  rl.close();
}

/* ==============================
   GAME START
   - Uses loop logic through function calls
================================ */
console.log("🎮 Welcome to the CLI Trivia Quiz!");
console.log(`⏱️ You have ${TIME_LIMIT} seconds per question.`);
setTimeout(askQuestion, 1500);
