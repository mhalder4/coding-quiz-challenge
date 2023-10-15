
var quizBox = document.querySelector(".quiz-box");
var highScoreBtn = document.querySelector(".high-score-btn");
var highScoreBox = document.querySelector(".high-score-box");
var highScoreList = document.querySelector(".high-score-list");
var startMenu = document.querySelector(".start-menu");
var startBtn = document.querySelector(".start-btn");
var gameOverMenu = document.querySelector(".game-over");
var startOverBtn = document.querySelector(".start-over-btn");
var timerDisplay = document.querySelector(".timer-display");

var isStartVisible = true;
var isQuizVisible = false;
var showHighScores = false;
var currentQuestionIndex = 0;

var highscores = [];

var timerSec = 120;

var score;

var question1 = {
  title: "What is used to store data in JavaScript with the keyword 'var'?",
  answers: ["A variable", "A declaration", "A function", "A tag"],
  correctAnswerIndex: "0"
};
var question2 = {
  title: "What is NOT a primitive data type in JavaScript?",
  answers: ["boolean", "object", "number", "string"],
  correctAnswerIndex: "1"
}
var question3 = {
  title: "What character is used to enclose a template literal?",
  answers: ["Backticks (`)", "Question marks (?)", "Quotation marks (\")", "Percent signs (%)"],
  correctAnswerIndex: "0"
}
var question4 = {
  title: "Is this statement evaluated to true or false: 3 === \"3\"",
  answers: ["true", "false"],
  correctAnswerIndex: "1"
}
var question5 = {
  title: "What is a function?",
  answers: ["A collection of data", "A single thing used to store data", "A data type", "Multiple pieces of code that are bundled together to be run when called"],
  correctAnswerIndex: "3"
}
var question6 = {
  title: "What would 5%2 evaluate to?",
  answers: ["5", "2", "1", "0"],
  correctAnswerIndex: "2"
}
var question7 = {
  title: "What is a method?",
  answers: ["A funtion specific to an object", "A primitive data type", "A way to iterate through data", "A variable"],
  correctAnswerIndex: "0"
}
var question8 = {
  title: "True or false: You can create your own functions",
  answers: ["true", "false"],
  correctAnswerIndex: "0"
}
var question9 = {
  title: "What are arrays?",
  answers: ["A way to evaluate data for true or false", "A collection of multiple pieces of data", "A function for an object", "A way to find the data type of a variable"],
  correctAnswerIndex: "1"
}
var question10 = {
  title: "What can be used to add items to the end of an array?",
  answers: [".charAt", ".slice", ".sort", ".push"],
  correctAnswerIndex: "3"
}

var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

console.log(questions);

// Loads local storage
function loadLocalStorage() {
  var tempScores = JSON.parse(localStorage.getItem("highscores"));
  if (tempScores !== null) {
    tempScores.forEach(function (object) {
      highscores.push(object);
    });
  }
}

// Updates local storage
function updateLocalStorage() {
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

// Clears local storage
function clearLocalStorage(event) {
  if (event.target.matches(".clear-scores-btn")) {
    localStorage.clear();
    highscores = [];
    updateHighScoreList();
  }
}

// Creates the table and table headings for the high scores inside the high score area
function createTable() {
  var scoreTable = document.createElement("table");
  scoreTable.setAttribute("class", "score-table");
  var scoreTableRow = document.createElement("tr");

  var scoreTableHeadingPlace = document.createElement("th");
  var scoreTableHeadingScore = document.createElement("th");
  var scoreTableHeadingInitials = document.createElement("th");

  scoreTableHeadingPlace.textContent = "Place";
  scoreTableHeadingScore.textContent = "Score";
  scoreTableHeadingInitials.textContent = "Initials";

  scoreTableRow.appendChild(scoreTableHeadingPlace);
  scoreTableRow.appendChild(scoreTableHeadingScore);
  scoreTableRow.appendChild(scoreTableHeadingInitials);

  scoreTable.appendChild(scoreTableRow);
  highScoreList.appendChild(scoreTable);


}

// Creates the form and other html for players to use to submit their score at the end of the quiz
function createHighScoreForm(div) {
  var form = document.createElement("form");
  div.appendChild(form);

  var label = document.createElement("label");
  label.textContent = "Enter your intials:";
  label.setAttribute("for", "initials");
  form.appendChild(label);

  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "initials");
  input.setAttribute("id", "initials");
  form.appendChild(input);

  var submit = document.createElement("button");
  submit.setAttribute("class", "submit-btn");
  submit.textContent = "Submit";
  form.appendChild(submit);
}

// creates the div to display the score for the game and space to put the entry form
function createHighScoreInputBox() {
  var highScoreDiv = document.createElement("div");
  highScoreDiv.setAttribute("class", "high-score-div");
  quizBox.appendChild(highScoreDiv);

  var highScoreHeading = document.createElement("h3");
  highScoreHeading.textContent = "Your score is: " + (timerSec - 1);
  highScoreDiv.appendChild(highScoreHeading);
  createHighScoreForm(highScoreDiv);

}

// Sorts the high scores from largest to smallest and cuts the array to a length of only 10 scores if it's too big
function manageHighScores(arr) {

  arr.sort(function (a, b) { return b.score - a.score });

  if (arr.length > 10) {
    arr = arr.slice(0, 10);
  }

  return arr;
}

//Creates the html to fit high scores on the table and appends them to the table
function updateHighScoreList() {

  var scoreTable = document.querySelector(".score-table");

  if (scoreTable === null) {
    createTable();
  } else {
    scoreTable.remove();
    createTable();
  }

  scoreTable = document.querySelector(".score-table");

  highscores = manageHighScores(highscores);

  var arrIndex = 0;

  highscores.forEach(function (obj) {
    console.log(obj.score);
    var scoreTableRow = document.createElement("tr");
    scoreTableRow.setAttribute("class", "table-row");
    var scoreTablePlace = document.createElement("td");
    var scoreTableScore = document.createElement("td");
    var scoreTableInitials = document.createElement("td");
    scoreTablePlace.textContent = arrIndex + 1;
    scoreTableScore.textContent = obj.score;
    scoreTableInitials.textContent = obj.playerInitials;
    scoreTableRow.appendChild(scoreTablePlace);
    scoreTableRow.appendChild(scoreTableScore);
    scoreTableRow.appendChild(scoreTableInitials);
    scoreTable.appendChild(scoreTableRow);
    arrIndex++;
  })

  arrIndex = 0;
}

// Starts the timer countdown and tracks if the game is over
function startCountdown() {

  var timeInterval = setInterval(function () {
    timerSec--;

    timerDisplay.textContent = timerSec;

    if (timerSec === 0 || checkGameOver() || isStartVisible) {
      clearInterval(timeInterval);
    }


  }, 1000)
}

// Hides or brings out the start menu and game over menu
function changeStartMenuDisplay() {
  if (isStartVisible) {
    startMenu.setAttribute("style", "display: none");
    displayQuestion(questions[currentQuestionIndex]);
    isStartVisible = false;
  } else if (!isStartVisible) {
    startMenu.setAttribute("style", "display: block");
    gameOverMenu.setAttribute("style", "display: none");
    isStartVisible = true;
    currentQuestionIndex = 0;
  }
  timerSec = 120;
  timerDisplay.textContent = timerSec;
}

// Toggles whether the high scores are displayed on screen or not
function toggleHighScores() {
  if (!showHighScores) {
    highScoreBox.setAttribute("style", "display: flex");
    updateHighScoreList();
    showHighScores = true;
  } else if (showHighScores) {
    highScoreBox.setAttribute("style", "display: none");
    showHighScores = false;
  }

}

// Displays the game over screen
function changeGameOverDisplay() {
  gameOverMenu.setAttribute("style", "display: block");
}

// Displays the current quiz question by creating the necessary html and appending to the existing div
function displayQuestion(question) {

  var questionDiv = document.createElement("div");
  questionDiv.setAttribute("class", "question-div");
  quizBox.appendChild(questionDiv);
  var questionTitle = document.createElement("h2");
  questionTitle.textContent = question.title;
  questionDiv.appendChild(questionTitle);
  var questionList = document.createElement("ul");
  questionList.setAttribute("style", "list-style-type: none")
  questionDiv.appendChild(questionList);

  for (var i = 0; i < question.answers.length; i++) {
    var answer = document.createElement("li");
    answer.setAttribute("class", "answer-btn");
    answer.setAttribute("id", `${i}`);
    answer.textContent = question.answers[i];
    questionList.appendChild(answer);
  }
}

// Checks if all the answers have been gone through
function checkGameOver() {
  if (currentQuestionIndex === questions.length) {
    return true;
  }
}


function checkSelection(event) {
  // Checks what answer button has been clicked and whether or not that was the right answer. Also chaecks if it was the last question in the quiz
  if (event.target.matches(".answer-btn")) {
    var clickedAnswerID = event.target.id;

    if (clickedAnswerID !== questions[currentQuestionIndex].correctAnswerIndex) {
      console.log("Wrong Answer.");
      timerSec -= 10;
    }

    var previousQuestionDiv = document.querySelector(".question-div");
    previousQuestionDiv.remove();

    currentQuestionIndex++;

    if (checkGameOver()) {
      console.log("Game Over.");
      createHighScoreInputBox();

    } else {
      displayQuestion(questions[currentQuestionIndex]);
    }
    // Checks if the submit score button has been clicked and properly adds the score to the high score list and local storage after submission
  } else if (event.target.matches(".submit-btn")) {
    event.preventDefault();
    var highscoreInput = document.getElementById("initials");
    var initials = highscoreInput.value;
    var player = {
      playerInitials: initials,
      score: timerSec
    }
    highscores.push(player);

    updateHighScoreList();
    updateLocalStorage();

    var highScoreDiv = document.querySelector(".high-score-div");
    highScoreDiv.remove();

    gameOverMenu.setAttribute("style", "display: block");

  }
}

// Starts the quiz and timer
function startGame() {
  changeStartMenuDisplay();
  startCountdown();
}


loadLocalStorage();

startBtn.addEventListener("click", startGame);
startOverBtn.addEventListener("click", changeStartMenuDisplay);
quizBox.addEventListener("click", checkSelection);
highScoreBtn.addEventListener("click", toggleHighScores);
highScoreBox.addEventListener("click", clearLocalStorage);