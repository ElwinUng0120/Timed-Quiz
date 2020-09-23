var starter = document.querySelector("#starterContainer");
var timer = document.querySelector("#timerContainer");
var quiz = document.querySelector("#quizContainer");
var feedback = document.querySelector("#feedbackContainer");
var highscoreModal = document.querySelector("#highscoreContainer");
var end = document.querySelector("#endContainer");
var choiceGroup = document.querySelector("#choices");
var highscoreButton = document.querySelector("#highscoreButton");
var closeModal = document.querySelector("#close");


var time;
var countInterval;
var indexQ = 0;
var indexCor = 0;

//Quiz questions and answers
//format: ["Question", "id of correct answer"]
var questions = [["What is Javascript?", "2"], 
                 ["What data type does this code returns: document.querySelector(...).textContent", "3"], 
                 ["What does prompt(...) do?", "1"],
                 ["What does 'this' keyword do?", "1"],
                 ["Which of the following is comment in HTML?","3"],
                 ["What is semantic HTML elements?","2"]];

var choices = [["It's like Java","A client/server-side language, which can be inserted into HTML","It's a low-level language like C","Java..what?"], 
               ["Integar","Array","String","null"], 
               ["Opens a dialog pop-up and allows user to input their response","Opens a pop-up box","Ask user a question, but does not take user input","Open a new page"],
               ["Refers to the object from where it was called","Refers to something","that?","I don't know"],
               ["/*...*/","//...","<!--...-->","`...`"],
               ["Different ways of coding HTML","HTML tags that are more readable for human","Link HTML pages with Javascript files","Another words for CSS"]];

//Start timer
function startTimer(){
    time = 60;
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
    }
}

//Managing question and choices
function quizInsert(){
    var quizQs = document.querySelector("#question");
    
    //index for populating choices
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
    //Trigger instant "Correct"/"Wrong" feedback
    feedbackBlock(event);

    if (indexQ == questions.length - 1){
        //When player finished the quiz, execute these.
        showThankYou();
        indexQ = 0;

    } else {
        //Update indexQ and insert a new set of question and choices
        if(event.target.localName == "button"){
            indexQ++;
            if (indexQ <= questions.length - 1) quizInsert();
        }
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
    var name = prompt(`You scored ${score}! Please enter your name/nickname`);
    if(isNaN(parseInt(highscore.children[1].textContent)) || parseInt(highscore.children[1].textContent) < score){
        highscore.children[0].innerHTML = `${name}`;
        highscore.children[1].innerHTML = `${score}`;
    }
    indexCor = 0;
}

function showThankYou(){
    var body = document.querySelector("#showScore");
    var score = (indexCor / questions.length) * 100;
    //Displaying score on screen
    body.innerHTML = `Your score: ${score}%`;

    //Showing Game end jumbotron only
    starter.style.display = "none";
    timer.style.display = "none";
    quiz.style.display = "none";
    feedback.style.display = "none";
    end.style.display = "block";
    addToHighscore();
    
    //addEventListener for Restarting
    document.querySelector("#restart").addEventListener("click", function(){
        end.style.display = "none";
        starter.style.display = "block";
    });
}

closeModal.addEventListener("click", close);
highscoreButton.addEventListener("click", displayHighscore);
starter.addEventListener("click", startQuiz);