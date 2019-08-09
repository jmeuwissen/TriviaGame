
let jsonTriviaQuestions = null;
let questionNumber = 0;
let transitionTimeout = null;
let tickingAnswerTimeout = null;
let correctCount = 0;
let incorrectCount = 0;
let timeLeft = 10;
let transitionTimeoutSet = false;

    //grabbing a bunch of trivia questions
    fetch(
        "https://opentdb.com/api.php?amount=3&type=multiple"
    ).then(function (response) {
        return response.json();
    }).then(function (responseJson) {
        console.log("fetched");
        jsonTriviaQuestions = responseJson;
        displayQuestion();
    });

//displays the next question and/or starts the game
function displayQuestion() {
    document.getElementById("question").innerHTML = jsonTriviaQuestions.results[questionNumber].question;
    assignAnswers();
    tickingAnswerTimeout = setTimeout(answerIncorrectly, 10000);
    clearTimeout(transitionTimeout);
    transitionTimeoutSet = false;
}

function nextQuestionTimeout() {
    if (!transitionTimeoutSet) {
        transitionTimeoutSet = true;
        transitionTimeout = setTimeout(nextQuestion, 3000);
    }
}

function endGame() {
    //display end-game stats
    document.getElementById("question").innerHTML = "";
    numberCorrectEl = document.createElement("p");
    numberIncorrectEl = document.createElement("p");
    resetButtonEl = document.createElement("button");


    numberCorrectEl.textContent = "Correct: " + correctCount;
    numberIncorrectEl.textContent = "Incorrect: " + incorrectCount;

    resetButtonEl.textContent = "Play Again!";
    resetButtonEl.addEventListener("click", resetGame);


    const displayEl = document.getElementById("display");

    displayEl.append(numberCorrectEl, numberIncorrectEl, resetButtonEl);



}

function nextQuestion() {

    document.getElementById("choices").innerHTML = "";
    questionNumber++;
    document.getElementById("message").textContent = "";
    if (questionNumber === jsonTriviaQuestions.results.length) {
        endGame();
    }
    else {
        displayQuestion();
    }
}


function removeAnswerListeners(){
    //remove listener from correct answer div
    document.getElementById("correct-answer").removeEventListener("click", answerCorrectly);


    //remove even listener from each incorrect answer div
    const incorrectEls = document.getElementsByClassName("incorrect-answer");

    //because i guess getelementsbyclassname returns an "array-like" object so no forEach!
    for (let i = 0; i < incorrectEls.length; i++) {
        console.log("removedListener!")
        incorrectEls.item(i).removeEventListener("click", answerIncorrectly);
        
    }
}

function answerCorrectly() {
    correctCount++;
    document.getElementById("message").textContent = "correct!"
    clearTimeout(tickingAnswerTimeout);

    removeAnswerListeners();
    nextQuestionTimeout();
}

function answerIncorrectly() {
    incorrectCount++;
    document.getElementById("correct-answer").textContent += " Correct Answer";
    document.getElementById("message").textContent = "Wrong Answer/You Took Too Long!"
    clearTimeout(tickingAnswerTimeout);
    removeAnswerListeners();
    nextQuestionTimeout();
}

function assignAnswers() {

    //putting all answers into an array from the json
    const answers = jsonTriviaQuestions.results[questionNumber].incorrect_answers;
    answers.push(jsonTriviaQuestions.results[questionNumber].correct_answer);

    //stack exchange says this shuffles an array
    answers.sort(() => Math.random() - 0.5);
    answers.forEach(answer => {
        const choicesEl = document.getElementById("choices");
        const choiceEl = document.createElement("p");
        choiceEl.innerHTML = answer;

        //if the element is the correct answer, this gives the element an event listener with function handling a correct answer
        if (answer === jsonTriviaQuestions.results[questionNumber].correct_answer) {
            choiceEl.addEventListener("click", answerCorrectly);
            choiceEl.setAttribute("id", "correct-answer");
        }
        //otherwise the element is given a listener with function handling incorrect answer
        else {
            choiceEl.addEventListener("click", answerIncorrectly);
            choiceEl.setAttribute("class", "incorrect-answer");
        }
        choicesEl.append(choiceEl);
    });

}

function resetGame() {
    questionNumber = 0;

    correctCount = 0;
    incorrectCount = 0;

    numberCorrectEl.textContent = "";
    numberIncorrectEl.textContent = "";

    fetch(
        "https://opentdb.com/api.php?amount=15&type=multiple"
    ).then(function (response) {
        return response.json();
    }).then(function (responseJson) {
        jsonTriviaQuestions = responseJson;
        displayQuestion();
    });

}

//start the main screen
//display will have text for user to start the game


//when game starts, change display to show the first set of trivia questions
//place question in the question div
//place each answer in a new element and append it to the answer div
//randomize the position of the correct answer
//  
//  randomize the order in which the answer elements are appended to the page


//  push each element into and array and use
//  use 
// function shuffle(array) {
//   array.sort(() => Math.random() - 0.5);
// }

//nextquestion
//assign new content to each answer element
//correct answer posiiton needs to be randomized again.

//assign event listeners to each wrong answer
//  listener will set message to "wrong answer!" and call nextQuestionTimeout()


//assign event listeners to the right answer
//  listener will set message to "correct answer!" and call nextQuestionTimeout()


//set a timeout to trigger after ten seconds
//  sets message to "You took too long" calls nextQuestionTimeout