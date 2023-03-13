'use strict';
const player0El =document.querySelector('.player--0');
const player1El =document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const bthNew = document.querySelector('.btn--new');
const bthRoll = document.querySelector('.btn--roll');
const bthHold = document.querySelector('.btn--hold');
const current0El  =document.getElementById('current--0');
const current1El  =document.getElementById('current--1');
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0,0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer }`).textContent=0;
    currentScore = 0; 
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

bthRoll.addEventListener('click',function () {
   if(playing)
   {
     // 1) generate the dice roll value 
     const dice = Math.trunc(Math.random()*6)+1;
     console.log(dice)
 
     // 2) displace the dice 
     diceEl.classList.remove('hidden');
     diceEl.src = `dice-${dice}.png`;
 
     // 3) checkfor rolled 1 if true swtich the payer
     if(dice != 1)
     {
 // add the score current dice value 
 currentScore += dice;
 document.getElementById(`current--${activePlayer }`).textContent=currentScore;
     }  
     else {
         // swtich
         switchPlayer();
     }
   }
});

bthHold.addEventListener('click',function () {
    if(playing)
    {
        // 1)add curr score to active player scroe
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2) check if score is >= 100 finsh the game 
  if(scores[activePlayer] >= 50)
  {
    // finish the game 
    playing = false; 
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--acive')
    

  }
  else
  {

      //  3)switch to next player
      switchPlayer();
  }
    }

})
//  reset the game 

bthNew.addEventListener('click',function(){
    score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.remove('hidden');
playing = true;
document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
    document.querySelector(`.player--${activePlayer}`).classList.add('player--acive');
    switchPlayer();
    scores[0] = 0;
    scores[1] = 0;

});