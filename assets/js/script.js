var quizBox = document.querySelector(".quiz-box");
var startMenu = document.querySelector(".start-menu");
var startBtn = document.querySelector(".start-btn");
var gameOverMenu = document.querySelector(".game-over");
var startOverBtn = document.querySelector(".start-over-btn");

var isStartVisible = true;
var isQuizVisible = false;
var isGameOverVisible = false;
var currentQuestionIndex = 0;

var question1 = {
  title: "What is used to store data in JavaScript with the keyword 'var'?",
  answers: ["A variable", "A declaration", "A function"],
  correctAnswerIndex: "0"
};
var question2 = {
  title: "What is NOT a primitive data type in JavaScript?",
  answers: ["boolean", "object", "number"],
  correctAnswerIndex: "1"
}
var questions = [question1, question2];

console.log(questions);

function changeStartMenuDisplay() {
  if (isStartVisible) {
    startMenu.setAttribute("style", "display: none");
    displayQuestion(question1);
    // gameOverMenu.setAttribute("style", "display: block");
    isStartVisible = false;
  } else if (!isStartVisible) {
    startMenu.setAttribute("style", "display: block");
    gameOverMenu.setAttribute("style", "display: none");
    isStartVisible = true;
  }
}

/*
1. Create a div for the question
2. Add the question title as a header
3. Add div for each answer with answer inside and a answer-btn class and answer-index id
4. Listen for click on answer-btn
5. If answer-index id == correctAnswerIndex move to next question else subtract time and move to next question
  1. Move to next question by removing question div, incrementing currentQuestion and repeating above steps for new question

*/

function displayQuestion(question) {
  // var previousQuestionDiv = document.querySelector(".question-div");
  // previousQuestionDiv.remove();

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
    // answer.setAttribute();
    questionList.appendChild(answer);
  }
}

function checkGameOver() {
  if (currentQuestionIndex === questions.length - 1) {
    return true;
  }
}

function checkSelection(event) {
  if (event.target.matches(".answer-btn")) {
    var clickedAnswerID = event.target.id;

    if (clickedAnswerID !== questions[currentQuestionIndex].correctAnswerIndex) {
      console.log("Wrong Answer.");
    }
    // console.log(clickedAnswerID);
    // console.log(questions[currentQuestionIndex].correctAnswerIndex);

    // console.log(event.target.id);
    var previousQuestionDiv = document.querySelector(".question-div");
    previousQuestionDiv.remove();



    if (checkGameOver()) {
      console.log("Game Over.");

    } else {
      currentQuestionIndex++;
      displayQuestion(questions[currentQuestionIndex]);
    }

    // currentQuestionIndex++;
    // displayQuestion(questions[currentQuestionIndex]);
  }
}

startBtn.addEventListener("click", changeStartMenuDisplay);
startOverBtn.addEventListener("click", changeStartMenuDisplay);
quizBox.addEventListener("click", checkSelection);