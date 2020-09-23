# Timed-Quiz
Goal: To create a timed-quiz with javascript and one html file.<br>
This project has the following abilities:
- User is able to start and restart the quiz
- After making a choice, a new set of question and answers will be inserted
- Able to check if player made a new highscore and display that when "View Highscore" is pressed

## Notes:
- Highscore is refreshed every time the page is reloaded
- localStorage is not used in the current build

<br>

This project contains the folloing:
- index.html: Contains Landing page, Quiz page and Game-ended page all in one.
- script.js: Uses javascript to control which HTML element is displayed on screen as well as manage the quiz.
- style.css: General styling for index.html.

<br>

This project was made using **HTML5**, **Bootstrap**, **Javascript** and **CSS**.<br>
This project is currently hosted on Github Pages: https://elwinung0120.github.io/Timed-Quiz/

# index.html
- Contains the following **Bootstrap** elements: Jumbotron, Modal, Buttons
- All elements are controlled through **script.js**

## Landing Page when the page is first loaded or "Restart" is pressed on Game-end Page
<img src="./img/readme/landing.jpg" alt="Landing page showcase" style="margin-left: auto; margin-right: auto" />

## Quiz Page when "Start" is pressed on Landing Page
<img src="./img/readme/quiz.jpg" alt="Quiz page showcase" style="margin-left: auto; margin-right: auto" />

## Game-end Page when the quiz is finished
<img src="./img/readme/gameend_finished.jpg" alt="Game-end page showcase" style="margin-left: auto; margin-right: auto" />

## Game ends when the timer runs out
<img src="./img/readme/gameend_timeout.jpg" alt="Game-end page at timeout showcase" style="margin-left: auto; margin-right: auto" />

## Shows leaderboard when "View Highscore" is pressed
<img src="./img/readme/leaderboard.jpg" alt="Leaderboard showcase" style="margin-left: auto; margin-right: auto" />

# script.js
- Made use of DOM to control index.html when button is pressed, e.g. "Start" button starts the quiz; "Restart" button restarts the quiz.
- Only appropriate elements are displayed on screen, e.g. Landing page on first load; Quiz page when "Start" is pressed
- Automatically switch to next question after an answer was selected as well as instant feedback as **Correct/Wrong**

## Feedback is provided below the quiz block
<img src="./img/readme/quiz_feedback.jpg" alt="index.html showcase" style="margin-left: auto; margin-right: auto" />

# style.css
- General styling for index.html
- Has display: none for all the HTML elements
