var header1El = document.getElementById("header1");
var contentEl = document.getElementById("content");
var startBtnEL = document.getElementById("startBtn");
var reStartBtnEL = document.getElementById("reStartBtn");
var storeBtnEl = document.getElementById("storeBtn");
var questionEL = document.getElementById("main");
var timeEl = document.querySelector("#time");
var feedbackEl = document.getElementById("feedback");
var choicesEl = document.getElementById("choices");
var finalIDEl = document.getElementById("finalID");
var finalScore = document.getElementById("finalScore");
var scoresFeedbackEl = document.getElementById("scoresFeedback");
var resultsEl = document.getElementById("results");
var highScoresEl = document.getElementById("highScores");
var score = 0;
var secondsLeft = myQuestions.length*15;
var currentQuestionIndex = 0;
var currentQuestion = myQuestions[currentQuestionIndex];

// on click of start button
// (on click event listener) (start button) 
//  Timer starts (default time on the timer)
//  Timer on screen
//  Function to start timer
//  Function the counts down. When time = 0, game over
// Presented with series of questions
// (object/array of questions)
//  somewhere in here I'll need a function to check IF answer is correct
// when answer question presented with next question
// incorrect answer = time off the clock
//  If question incorrect, subtract time
// when timer reaches zero = game over
//  IF time = 0 then game over; maybe need a game over function?
// when all questions answered = game over
//  IF we've gone through all questions, then game over
//  Loop through until reach questions.length
// when game is over, save initials and score

function startQuiz () {
    header1El.innerHTML = " ";
    resultsEl.innerHTML = " ";
    startBtnEL = document.getElementById("startBtn");
    startBtnEL.classList.add("d-none"); //d-none hides the start button in a bootstrap element - thanks, Google.
    getChoices();
    setTime(); 
}

function getChoices() {
    // e.preventDefault();
    //console.log(currentQuestion.choices); works
    var currentQuestion = myQuestions[currentQuestionIndex];
    var titleEL = document.getElementById("main");
    titleEL.textContent = currentQuestion.question;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach( function (choice, i) {
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "btn btn-success");
        choiceButton.setAttribute("id", "qzBtn");
        choiceButton.setAttribute("value", i);
        choiceButton.textContent = i + 1 + ". "+choice;
        choiceButton.onclick = questionClick;
        choicesEl.appendChild(choiceButton);
        }
    ) 
}
    function questionClick (e) {
        
        e.preventDefault();
        if (this.value != myQuestions[currentQuestionIndex].correctAnswer) {
            secondsLeft -= 10;
            if (secondsLeft < 0) {
                secondsLeft = 0;
            }
            
            timeEl.textContent = time;
            feedbackEl.innerHTML = "<br>"
            feedbackEl.textContent = "Incorrect";
        } else { 
            feedbackEl.textContent = "Correct";
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex===myQuestions.length || secondsLeft <= 0) {
            quizResults();
            return;
        }
        getChoices();
    }
    
    function setTime() {
        var timerInterval = setInterval(function() {
            secondsLeft--;
            timeEl.textContent = `Time: ${secondsLeft}`;
            
            if(secondsLeft === 0 || currentQuestionIndex===myQuestions.length || secondsLeft <= 0) {
                clearInterval(timerInterval);
            }
            
        }, 1000);
       
    }
 
    function quizResults() { //function shows the results and stores it in the local storage inside console.log.
        questionEL.innerHTML = " ";
        choicesEl.innerHTML = ' ';
        header1El.innerHTML = "All Done!";
        choicesEl.innerHTML = "Enter your initials: ";
        finalScore.textContent = `Your score is: ${score}`;
        timeEl.classList.add("d-none");
        feedbackEl.classList.add("d-none");
        finalIDEl.classList.remove("d-none");
        finalScore.classList.remove("d-none");
        storeBtnEl.classList.remove("d-none");
    }
    
        function storeResults() {
        console.log('started')
        localStorage.setItem(finalIDEl.value, score);
        reStartBtnEL.classList.remove("d-none");
        var scoresMessage = document.createElement("div");
        scoresMessage.innerText = `Your results are stored! Please view the High Scores link above or click the button below to start over.`;
        scoresFeedbackEl.prepend(scoresMessage);
    }

    function renderResults() {
        
        if (localStorage.length == 0) {
            resultsEl.innerHTML = " ";
            var resultsDiv = document.createElement("p");
            resultsDiv.innerText =`No results stored. Please take a test!`;
            resultsEl.appendChild(resultsDiv);
        } else {
        resultsEl.innerHTML = " ";
        for (i = 0; i < localStorage.length; i++) {
            var testResult = localStorage.getItem(localStorage.key(i));
            var testKey = localStorage.key(i);
            var resultsDiv = document.createElement("p");
            
            resultsDiv.innerText =`${testKey} score is ${testResult}`;
            resultsEl.appendChild(resultsDiv);
        }
    }}
    
function refresh () {
    location.reload();
}

startBtnEL.addEventListener("click", startQuiz);
storeBtnEl.addEventListener("click", storeResults);
highScoresEl.addEventListener("click", renderResults);
reStartBtnEL.addEventListener("click", refresh);