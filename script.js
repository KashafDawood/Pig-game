'use strict';

//selecting elements
const player0El = document.querySelector(".player--0")
const player1El = document.querySelector(".player--1")
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");

//staring condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let score = [0 , 0];
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

let playing = true;

const init = function(){
    playing = true;
    currentScore = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    diceEl.classList.add("hidden");
    score = [0 , 0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    if(activePlayer !== 0){
        player0El.classList.remove("player--winner");
        player1El.classList.remove("player--winner");
        activePlayer = 0;
        player0El.classList.add("player--active");
        player1El.classList.remove("player--active");
    }
}


btnRoll.addEventListener("click" , function(){
    if(playing){
        //1. Generate a random dice roll 

        const roll = Math.trunc(Math.random() * 6) + 1;

        //2. display dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${roll}.png`;
        //3. check for rolled 1: if true , switch to the next player
        if(roll !== 1){
            currentScore += roll;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            switchPlayer();
        }
    }
});

//hold btn
btnHold.addEventListener("click" , function(){
    if(playing){
        //1. current player score add in active player score
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        //2. check score >= 100
        if(score[activePlayer]>=100){
            playing = false;
            diceEl.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            win();
        }
        else{
            switchPlayer();
        }
    }
});

//new game btn
btnNew.addEventListener("click" , function(){
    init();
});