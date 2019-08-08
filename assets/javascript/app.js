
//handler for events triggered by clicking on the question option
answerQuestion(){

}

function triviaQuestion(answers, question, ) {

}
const jsonTriviaQuestions = []; 
//grabbing a bunch of trivia questions
fetch(
    "https://opentdb.com/api.php?amount=15&type=multiple"
).then(function (response) {
    return response.json();
}).then(function (responseJson) {
    jsonTriviaQuestions = responseJson;
});

function displayQuestion(){

}

function nextQuestionTimeout(){
    transitionTimeout = setTimeout(nextQuestion, 3000);
}

function assignAnswers(){
    
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