const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next");
const resultElement = document.getElementById("result");
const timerElement = document.getElementById("timer");
const highScoreElement = document.getElementById("high-score");
const retryButton = document.getElementById("retry");

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

// TODO: Create an array of questions for user input
const questions = [

];


function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = "";
    question.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => selectOption(index));
        optionsElement.appendChild(optionElement);
    });
}

function selectOption(index) {
    const question = questions[currentQuestion];
    if (index === question.correct) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = "none";
    nextButton.style.display = "none";
    resultElement.style.display = "block";
    retryButton.style.display = "block";
    resultElement.textContent = `Your score: ${score}/${questions.length}`;

    const previousHighScore = localStorage.getItem("highScore") || 0;
    if (score > previousHighScore) {
        localStorage.setItem("highScore", score);
        highScoreElement.textContent = `High Score: ${score}`;
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

nextButton.addEventListener("click", () => {
    if (currentQuestion === 0) {
        startTimer();
        nextButton.textContent = "Next";
    }
    showQuestion();
});

retryButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    timerElement.textContent = `Time: ${timeLeft}`;
    showQuestion();
    startTimer();
    quizContainer.style.display = "block";
    nextButton.style.display = "block";
    resultElement.style.display = "none";
    retryButton.style.display = "none";
});

const storedHighScore = localStorage.getItem("highScore") || 0;
highScoreElement.textContent = `High Score: ${storedHighScore}`;

showQuestion();
