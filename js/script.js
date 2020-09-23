var starter = document.querySelector("#starterContainer");
var timer = document.querySelector("#timerContainer");
var quiz = document.querySelector("#quizContainer");
var feedback = document.querySelector("#feedbackContainer");
var highscoreModal = document.querySelector("#highscoreContainer");
var end = document.querySelector("#endContainer");
var choiceGroup = document.querySelector("#choices");
var highscoreButton = document.querySelector("#highscoreButton");
var closeModal = document.querySelector("#close");


var time = 60;
var countInterval;
var indexQ = 0;
var indexCor = 0;

//Quiz questions and answers
//["Question", "id of correct answer"]
var questions = [["Q1", "1"], 
                 ["Q2", "2"], 
                 ["Q3", "3"]];
var choices = [["1","2","3","4"], 
               ["1","2","3","4"], 
               ["1","2","3","4"]];

//Start timer
function startTimer(){
    countInterval = setInterval(count, 1000);
}

//Actual counter. Decrement by 1 each second.
function count(){
    var counter = document.querySelector("#timer");
    time--;
    counter.textContent = time + "s";

    //When time runs out, execute these
    if(time == 0){
        clearInterval(countInterval);
        showThankYou();
        indexQ = 0;
        indexCor = 0;
    }
}

//Managing question and choices
function quizInsert(){
    var quizQs = document.querySelector("#question");
    
    //index for populating choices
    var j = 0;

    if(questions.length > indexQ){
        //To place question
        quizQs.textContent = questions[indexQ][0];

        //To populate all choices using .children[i]
        //i < 8 because choiceGroup has 8 children and increment i by 2 because each choice is seperated by a <br>
        for(var i = 0; i < 8; i++){
            choiceGroup.children[i].textContent = choices[indexQ][j];
            i++; //To increment i by 2;
            j++;
        }
    }
}

//Triggered every time a choice is made. Update the current question's indexQ and trigger quizInsert().
function updateQuiz(event){

    //Trigger instant "Correct"/"Wrong" feedback
    feedbackBlock(event);
    //Checking if the player has reached the end
    if(questions.length > indexQ){
        //Update indexQ and insert a new set of question and choices
        if(event.target.localName == "button"){
            indexQ++;
            quizInsert();
        }
    //When player finished the quiz, execute these.
    } else {
        showThankYou();
        indexQ = 0;
        indexCor = 0;
    }
}

//Display "Correct" or "Wrong" for the previous question
function feedbackBlock(event){
    if(questions.length > indexQ){
        if (event.target.value == questions[indexQ][1]) {
            feedback.children[0].textContent = "Correct!";
            indexCor++;
        }
        else feedback.children[0].textContent = "Wrong!";
    }
}

//Start sequence
function startQuiz(event){

    //Checking if the button is pressed
    if(event.target.localName == "button"){
    
        //Hide Landing and displace the quiz
        starter.style.display = "none";
        timer.style.display = "block";
        quiz.style.display = "block";
        feedback.style.display = "block";

        startTimer();

        //Handling quiz
        quizInsert();
        choiceGroup.addEventListener("click", updateQuiz);
    }
}

//Show Modal when View Highscore button is pressed
function displayHighscore(event){
    highscoreModal.style.display = "block";
}

//Hide Modal when "x" in it is pressed
function close(){
     highscoreModal.style.display = "none";
}

//Replace highscore if player's score is new highscore
function addToHighscore(){
    var highscore = document.querySelector("#highscore");
    var score = (indexCor / questions.length) * 100;
    console.log("RAN HIGHSCORE");
    name = prompt("Please enter your name/nickname");
    highscore.children[0].textContent = name;
    highscore.children[1].textContent = score;
}

function showThankYou(){
    var body = document.querySelector("#showScore");
    var score = (indexCor / questions.length) * 100;
    console.log(indexCor);
    body.innerHTML = `Your score: ${score}%`;
    starter.style.display = "none";
    timer.style.display = "none";
    quiz.style.display = "none";
    feedback.style.display = "none";
    end.style.display = "block";
    addToHighscore();
    document.querySelector("#restart").addEventListener("click", function(){
        end.style.display = "none";
        starter.style.display = "block";
    });
}

closeModal.addEventListener("click", close);
highscoreButton.addEventListener("click", displayHighscore);
starter.addEventListener("click", startQuiz);