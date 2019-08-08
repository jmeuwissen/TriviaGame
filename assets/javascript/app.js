
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

//start the main screen
//display will have text for user to start the game


//when game starts, change display to show the first set of trivia questions
//place question in the question div
//place each answer in a new element and append it to the answer div
//randomize the position of the correct answer
//assign event listeners to each wrong answer
//  listener will call the incorrectlyAnswered function
//assign event listeners to the right answer
//set a timeout to trigger the incorrectlyAnswered function