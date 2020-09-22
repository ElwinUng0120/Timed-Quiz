var starter = document.querySelector("#starterContainer");
var quiz = document.querySelector("#quizContainer");
var choiceGroup = document.querySelector("#choices");
var feedback = document.querySelector("#feedbackContainer");
var highscoreButton = document.querySelector("#highscoreButton");
var highscoreModal = document.querySelector("#highscoreContainer");
var closeModal = document.querySelector("#close");


var time = 60;
var countInterval;
var indexQ = 0;
var indexCor = 0;

//Quiz questions and answers
var questions = [["Q1", "1"], 
                 ["Q2", "2"], 
                 ["Q3", "3"]];
var choices = [["1","2","3","4"], 
               ["1","2","3","4"], 
               ["1","2","3","4"]];

//For displaying scoreboard
var scoreboardList = [];


//Start timer
function startTimer(){
    countInterval = setInterval(count, 1000);
}

//Actual counter. Decrement by 1 each second.
function count(){
    var counter = document.querySelector("#timer");
    time--;
    counter.textContent = time + "s";

    if(time == 0){
        clearInterval(countInterval);
        //Thank you message and show score;
    }
}

//Managing question and choices
function quizInsert(){
    var quizQs = document.querySelector("#question");
    var choiceGroup = document.querySelector("#choices");
    
    //indexQ for populating choices
    var j = 0;

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

//Triggered every time a choice is made. Update the current question's indexQ and trigger quizInsert().
function updateQuiz(event){

    feedbackBlock(event);

    //Update indexQ and insert a new set of question and choices
    if(event.target.localName == "button"){
        indexQ++;
        quizInsert();
    }
}

//Display "Correct" or "Wrong" for the previous question
function feedbackBlock(event){
    if (event.target.value == questions[indexQ][1]) {
        feedback.children[0].textContent = "Correct!";
        indexCor++;
    }
    else feedback.children[0].textContent = "Wrong!";
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

//Show Modal
function displayHighscore(event){
     highscoreModal.style.display = "inline";
     console.log("RAN");
}

//Hide Modal
function close(){
     highscoreModal.style.display = "none";
}

//Add to highscore leaderboard
function addToHighscore(event){
    event.preventDefault();
    var scoreboard = document.querySelector("#highscore");
    var li = document.createElement("li");
    li.id = scoreboard.length;
    var name = "Player 1" + li.id;
    var score = indexCor;
    li.innerHTML = name + "                  " + indexCor + "/" + questions.length;
    scoreboardList.push([name, score]);
    highscore.append(li);
    indexCor = 0;
}

closeModal.addEventListener("click", close);
highscoreButton.addEventListener("click", displayHighscore);
starter.addEventListener("click", startQuiz);