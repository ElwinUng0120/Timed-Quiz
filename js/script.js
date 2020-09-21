var starter = document.querySelector("#starterContainer");
var countDown = document.querySelector("#timerContainer");
var quiz = document.querySelector("#quizContainer");
var feedback = document.querySelector("#feedbackContainer");

var questions = [{ questions: "",
                   answerId: ""  }];

function timerBlock(){
    var time = 60;
    
}

function quizBlock(){

}

function feedbackBlock(){
    //if answer is correct, display RIGHT in the block
}

//Hide the landing and display the quiz and the timer when button is clicked
function starterBlock(event){
    //Checking if the button is pressed
    if(event.target.localName == "button"){
        starter.style.display = "none";
        countDown.style.display = "block";
        quiz.style.display = "block";
    }
}

starter.addEventListener("click", starterBlock);