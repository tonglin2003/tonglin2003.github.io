// ------------ Set Up for interactive elements ----------- //

// Game Start Button
const modal = document.querySelector(".modalGame");
const playBtn = document.querySelector(".background-words button");
const playDirection = document.querySelector(".play-direction");

// gameContent (score board and reset button)
const resetBtn = document.querySelector(".gameContent button");
const currentScore = document.querySelector(".current-score");
const highestScore = document.querySelector(".highest-score");
const scoreBoard = document.querySelector(".gameContent")

// gameArea (user input, hints for users, check button, images for current situation)
const userInput = document.querySelector(".gameArea input");
const hintParagraph = document.querySelector(".gameArea p");
const checkBtn = document.querySelector(".gameArea button");
const guessingCondition = document.querySelector(".gameArea");


// ------- different condition in the game (winning and losing) ------- //
// Winning Area and Winning paragraphs and headings
const winning = document.querySelector("#won-game");
const winPara = document.querySelector("#won-game .winning-report1");
const winBest = document.querySelector("#won-game .winning-best-score");
const winCurrentScore = document.querySelector("#won-game h3");
const playAgainBtn = document.querySelector("#won-game button");


const losing = document.querySelector("#game-over");
const losingReport = document.querySelector(".losing-report");
const tryAgainBtn = document.querySelector("#game-over button");

const guessHistory = document.querySelector(".guess-list");
let guessList = [];

let score = 10;
let randomNumber = Math.trunc(Math.random() * 100 +1);

// ------------ Start Game ----------- //

playBtn.addEventListener("click", function() {
    playDirection.style.display = "none";
    modal.style.display = "block";
    console.log(randomNumber);

});


//----------- Functions ---------//
function checkIfCorrect(userGuess, ranNum) {
    return userGuess === ranNum;
}

function updateGuessHistory() {
    let tag = document.createElement("li");
    let text = document.createTextNode(`${userInput.value}`);
    tag.append(text);
    guessHistory.appendChild(tag);
}

function guessWrong() {
    score -= 1;
    currentScore.innerHTML = score;
    let difference = randomNumber - Number(userInput.value)

    if (difference > 0) {
        if (difference <= 15) {hintParagraph.textContent = "You are guessing a little low (within 15)."}
        if (difference <= 5) {hintParagraph.textContent = "You are guessing a little bit low, but very close! (within 5)."}
        else {hintParagraph.textContent = "You are guessing too low."}
    }
    else{
        if (difference >= -15) {hintParagraph.textContent = "You are guessing a little high (within 15)."}
        if (difference >= 5) {hintParagraph.textContent = "You are guessing a little bit high, but very close! (within 5)."}
        else {hintParagraph.textContent = "You are guessing too high."}
    }

    updateGuessHistory();

}

function checkSameNum(userGuess, guessList) {
    if (guessList.length === 0) {
        return false;
    }
    else {
        for (let i = 0; i < guessList.length; i++) {
            if (userGuess === guessList[i]) {
                return true;
            }
        }

    }
}

function checkIfNumber(userGuess) {
    return !isNaN(userGuess);
}

// ------- Winning and Losing Functions -------- //

function correctGuessed () {
    if (Number(currentScore.innerHTML)> Number(highestScore.innerHTML)){
        highestScore.innerHTML = currentScore.innerHTML;
        winBest.textContent =  `Best: ${highestScore.innerHTML}`;

    }
    guessingCondition.style.display = "none";
    scoreBoard.style.display = "none";
    resetBtn.style.display = "none";
    winning.style.display = "flex";
    winPara.textContent = `Your guess was correct. ${randomNumber} is my secret number.`;
    winCurrentScore.textContent = `Your Score: ${currentScore.textContent}`
}

function gameOver () {
    guessingCondition.style.display = "none";
    losing.style.display = "flex";
    resetBtn.style.display = "none";
    losingReport.textContent = `Your Number was ${randomNumber}`


}

function removeHistory () {
    const ulLength = document.getElementsByTagName("li").length;

    for (let i = 0; i < ulLength; i++) {
        guessHistory.removeChild(guessHistory.lastChild);
    }

    // to empty the guess history stored in the data.
    guessList = [];
}


function reset () {
    guessingCondition.style.display = "flex";
    scoreBoard.style.display = "block";
    resetBtn.style.display = "block";
    losing.style.display = "none";
    winning.style.display = "none";
    currentScore.innerHTML = "10";
    userInput.value = '';
    randomNumber = Math.trunc(Math.random() * 100 +1);
    console.log(randomNumber);
    score = 10;
    hintParagraph.textContent = "Guess a Number";

    removeHistory();

}

// ------------ Get user input after check button clicked ----------- //

checkBtn.addEventListener("click", function() {
    let userGuess = Number(userInput.value);
    console.log(userGuess);
    if (checkIfNumber(userGuess)) {
        if (userGuess > 100 || userGuess < 1) {
            alert("You have entered a number out of range! Please enter a number between 1 and 100 (inclusive).")
        } else {
            // if guess correctly then show the winning window!
            if (checkIfCorrect(userGuess, randomNumber)) {
                correctGuessed();
            }
            else {
                // if the player guess the wrong number then -1 for score, change hint message
                // return true if there is any same number
                if (checkSameNum(userGuess, guessList)) {
                    hintParagraph.textContent = "Hey! You used this number already!";
                } else if (Number(currentScore.innerHTML) === 0) {
                    gameOver();
                } else {
                    guessWrong();
                    guessList.push(userGuess);
                }
            }
        }
    }
    else {
        hintParagraph.textContent = "You can only enter number between 1 and 100.";
        }

})


// ------------ Reset Buttons (reset, try again button, play again button ----------- //
resetBtn.addEventListener("click", reset);
tryAgainBtn.addEventListener("click", reset);
playAgainBtn.addEventListener("click", reset);
