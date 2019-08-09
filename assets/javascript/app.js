
//handler for events triggered by clicking on the question option
answerQuestion(){

}

let jsonTriviaQuestions = null; 
let questionNumber = 0;
let transitionTimeout = null;
let tickingAnswerTimeout = null;
//grabbing a bunch of trivia questions
fetch(
    "https://opentdb.com/api.php?amount=15&type=multiple"
).then(function (response) {
    return response.json();
}).then(function (responseJson) {
    jsonTriviaQuestions = responseJson;
});

function displayQuestion(){
    document.getElementById("question").textContent = jsonTriviaQuestions.results[questionNumber].question;
    assignAnswers();
    tickingAnswerTimeout = setTimeout(answerIncorrectly, 10000);
    clearTimeout(transitionTimeout);
}

function nextQuestionTimeout(){
    transitionTimeout = setTimeout(nextQuestion, 3000);
}

function nextQuestion(){
    document.getElementById("choices").innerHTML = "";
    questionNumber++;
    displayQuestion();
    assignAnswers();
    document.getElementById("message").textContent = "";
}

function answerCorrectly(){
    document.getElementById("message").textContent = "correct!"
    clearTimeout(tickingAnswerTimeout);
    nextQuestionTimeout();
}

function answerIncorrectly(){
    document.getElementById("correct-answer").textContent += " Correct Answer";
    document.getElementById("message").textContent = "Wrong Answer/You Took Too Long!"
    clearTimeout(tickingAnswerTimeout);
    nextQuestionTimeout();
}

function assignAnswers(){
    
    //putting all answers into an array from the json
    const answers = jsonTriviaQuestions.results[questionNumber].incorrect_answers;
    answers.push(jsonTriviaQuestions.results[questionNumber].correct_answer);
    
    //stack exchange says this shuffles an array
    answers.sort(() => Math.random() - 0.5);
    answers.forEach(answer => {
        choicesEl = document.getElementById("choices");
        choiceEl = document.createElement("p");
        choiceEl.textContent = answer;

        //if the element is the correct answer, this gives the element an event listener with function handling a correct answer
        if(answer === jsonTriviaQuestions.results[questionNumber].correct_answer ){
            choiceEl.addEventListener("click", answerCorrectly);
            choiceEl.setAttribute("id", "correct-answer");
        }
        //otherwise the element is given a listener with function handling incorrect answer
        else{
            choiceEl.addEventListener("click", answerIncorrectly);
        }
        choicesEl.append(choiceEl);
    });
    
}

function resetGame(){
    questionNumber = 0;
    fetch(
        "https://opentdb.com/api.php?amount=15&type=multiple"
    ).then(function (response) {
        return response.json();
    }).then(function (responseJson) {
        jsonTriviaQuestions = responseJson;
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