
let timeLeft = 120;
let timerInterval = null;

let quizIndex = 0;
let quizScore = 0;
let totalQuestions = 5;
let backToStartBtn;

function saveProgress() {
  const difficulty = document.getElementById("difficulty").value || "medium";
  const key = `progress-${difficulty}`;

  let data = localStorage.getItem(key);
  let progress = data ? JSON.parse(data) : { highest: 0, total: 0, sum: 0 };

  progress.total += 1;
  progress.sum += quizScore;

  if (quizScore > progress.highest) {
    progress.highest = quizScore;
  }

  localStorage.setItem(key, JSON.stringify(progress));
}

function loadNextQuizQuestion() {
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");

  if (nextBtn) nextBtn.style.display = "none";
  if (restartBtn) restartBtn.style.display = "none";

  if (quizIndex >= totalQuestions) {
    document.getElementById("quiz-box").innerHTML = `
      <h1>Quiz Completed!</h1>
      <p>Your Score: ${quizScore} / ${totalQuestions}</p>
    <h2>Review Mode</h2>
    ${window.reviewData.map((q, i) => `
  <div style="border: 4px solid ${q.selectedAnswer === q.correctAnswer ? 'green' : 'red'}; padding: 1rem; margin-top: 1rem;">
    <strong>Q${i + 1}:</strong> ${q.questionText}<br>
    <img src="${q.imageData}" alt="Question Diagram" style="max-width: 100%; margin: 1rem 0;" /><br>
    <strong>Your Answer:</strong> ${q.selectedAnswer || 'None'}<br>
    <strong>Correct Answer:</strong> ${q.correctAnswer}<br>
    ${q.selectedAnswer === q.correctAnswer ? '<span style="color:green; font-size:20px;">Correct</span>' : '<span style="color:red; font-size:20px;">Incorrect</span>'
}
  </div>
`).join("")}

    `;

    document.getElementById("quiz-ui").style.display = "none";

    const canvas = document.getElementById("myCanvas");
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (restartBtn) restartBtn.style.display = "block";
    if (backToStartBtn) backToStartBtn.style.display = "block";

    saveProgress();
    return;
  }

  quizIndex++;

  const counter = document.getElementById("question-counter");
  if (counter) {
    counter.innerText = `Question ${quizIndex} of ${totalQuestions}`;
  }

  generateDecoderQuestion();
}

window.loadNextQuizQuestion = loadNextQuizQuestion;

window.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-quiz-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  backToStartBtn = document.getElementById("back-to-start-btn");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      const dropdown = document.getElementById("question-count");
      totalQuestions = parseInt(dropdown.value);
      const difficulty = document.getElementById("difficulty").value;
      let timePerQuestion = 20;

      if (difficulty === "easy") {
        timePerQuestion = 60;
      } else if (difficulty === "medium") {
        timePerQuestion = 40;
      }

      timeLeft = totalQuestions * timePerQuestion;

      document.getElementById("start-screen").style.display = "none";
      document.querySelector("main").style.display = "block";
      document.getElementById("quiz-ui").style.display = "block";
      document.getElementById("score-counter").innerText = "Score: 0";

      quizIndex = 0;
      quizScore = 0;
      clearInterval(timerInterval);

      startQuizTimer();
      loadNextQuizQuestion();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      loadNextQuizQuestion();
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      quizIndex = 0;
      quizScore = 0;

      const quizBox = document.getElementById("quiz-box");
      quizBox.innerHTML = `
        <p id="question-counter" style="font-weight: bold; color: #66f2ff;">Question 1 of ${totalQuestions}</p>
        <h2 id="text-question">Loading question...</h2>
        <div class="options">
          <button id="option1" class="quiz-option option-text"></button>
          <button id="option2" class="quiz-option option-text"></button>
          <button id="option3" class="quiz-option option-text"></button>
          <button id="option4" class="quiz-option option-text"></button>
        </div>
        <button id="next-btn" style="display: none;">Next Question</button>
      `;

      document.getElementById("score-counter").innerText = "Score: 0";
      document.getElementById("quiz-ui").style.display = "block";

      setTimeout(() => {
        const newNextBtn = document.getElementById("next-btn");
        if (newNextBtn) {
          newNextBtn.addEventListener("click", () => {
            loadNextQuizQuestion();
          });
        }
      }, 0);

      const difficulty = document.getElementById("difficulty").value;
      let timePerQuestion = 20;

      if (difficulty === "easy") {
        timePerQuestion = 60;
      } else if (difficulty === "medium") {
        timePerQuestion = 40;
      }

      timeLeft = totalQuestions * timePerQuestion;
      clearInterval(timerInterval);
      startQuizTimer();
      loadNextQuizQuestion();
    });
  }

  if (backToStartBtn) {
    backToStartBtn.addEventListener("click", () => {
      quizIndex = 0;
      quizScore = 0;
      clearInterval(timerInterval);

      document.querySelector("main").style.display = "none";
      document.getElementById("quiz-ui").style.display = "none";
      document.getElementById("start-screen").style.display = "block";
      document.getElementById("restart-btn").style.display = "none";
      backToStartBtn.style.display = "none";

      const quizBox = document.getElementById("quiz-box");
      quizBox.innerHTML = `
        <p id="question-counter" style="font-weight: bold; color: #66f2ff;">Question 1</p>
        <h2 id="text-question">Loading question...</h2>
        <div class="options">
          <button id="option1" class="quiz-option option-text"></button>
          <button id="option2" class="quiz-option option-text"></button>
          <button id="option3" class="quiz-option option-text"></button>
          <button id="option4" class="quiz-option option-text"></button>
        </div>
        <button id="next-btn" style="display: none;">Next Question</button>
      `;

      setTimeout(() => {
        const nextBtn = document.getElementById("next-btn");
        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            loadNextQuizQuestion();
          });
        }
      }, 0);

      const timerBar = document.getElementById("timer-bar");
      if (timerBar) timerBar.style.width = "100%";
      document.getElementById("score-counter").innerText = "Score: 0";

      const canvas = document.getElementById("myCanvas");
      if (canvas && canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });
  }

  function loadProgressSummary() {
    const difficulties = ["easy", "medium", "challenge"];
    const container = document.createElement("div");
    container.style.marginTop = "2rem";
    container.style.color = "#66f2ff";
    container.innerHTML = "<h3>Your Progress:</h3>";

    difficulties.forEach(diff => {
      const key = `progress-${diff}`;
      const data = localStorage.getItem(key);
      if (data) {
        const { highest, total, sum } = JSON.parse(data);
        const avg = (sum / total).toFixed(2);
        container.innerHTML += `
          <p><strong>${diff.toUpperCase()}</strong> — Highest Score: ${highest}, Quizzes Taken: ${total}, Avg Score: ${avg}</p>
        `;
      } else {
        container.innerHTML += `
          <p><strong>${diff.toUpperCase()}</strong> — No data yet.</p>
        `;
      }
    });

    document.getElementById("start-screen").appendChild(container);
  }

  loadProgressSummary();

  const resetBtn = document.getElementById("reset-progress-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all progress?")) {
        ["easy", "medium", "challenge"].forEach(diff => {
          localStorage.removeItem(`progress-${diff}`);
        });
        location.reload();
      }
    });
  }

});

function startQuizTimer() {
  const timerDisplay = document.getElementById("timer");
  const timerBar = document.getElementById("timer-bar");

  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuizDueToTime();
      return;
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.innerText = `Time: ${minutes}:${seconds.toString().padStart(2, "0")}`;

    if (timeLeft <= 20) {
      timerDisplay.style.color = timeLeft % 2 === 0 ? "#ff4d4d" : "#66f2ff";
    } else {
      timerDisplay.style.color = "#66f2ff";
    }

    if (timerBar) {
      const percent = (timeLeft / (totalQuestions * 20)) * 100;
      timerBar.style.width = `${percent}%`;

      if (timeLeft <= 20) {
        timerBar.style.backgroundColor = timeLeft % 2 === 0 ? "#ff4d4d" : "#66f2ff";
      } else {
        timerBar.style.backgroundColor = "#66f2ff";
      }
    }

    timeLeft--;
  }, 1000);
}

function endQuizDueToTime() {
  saveProgress();

  const quizBox = document.getElementById("quiz-box");
  quizBox.innerHTML = `
    <h1>Time's Up!</h1>
    <p>Your Score: ${quizScore} / ${totalQuestions}</p>
    <h2>Review Mode</h2>
    ${window.reviewData.map((q, i) => `
  <div style="border: 1px solid ${q.selectedAnswer === q.correctAnswer ? 'green' : 'red'}; padding: 1rem; margin-top: 1rem;">
    <strong>Q${i + 1}:</strong> ${q.questionText}<br>
    <img src="${q.imageData}" alt="Question Diagram" style="max-width: 100%; margin: 1rem 0;" /><br>
    <strong>Your Answer:</strong> ${q.selectedAnswer || 'None'}<br>
    <strong>Correct Answer:</strong> ${q.correctAnswer}<br>
    ${q.selectedAnswer === q.correctAnswer ? '<span style="color:green;"> Correct</span>' : '<span style="color:red;"> Incorrect</span>'}
  </div>
`).join("")}

  `;

  const canvas = document.getElementById("myCanvas");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  document.getElementById("restart-btn").style.display = "block";
  document.getElementById("back-to-start-btn").style.display = "block";
  document.getElementById("quiz-ui").style.display = "none";
}
