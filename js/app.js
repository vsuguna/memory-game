/*
 * Create a list that holds all of your cards
 */
 const cardClasses = ["fa-gem", "fa-gem", "fa-plane", "fa-plane", "fa-anchor", "fa-anchor",
            "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
            "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

 var openedCards = [];
 var shuffledCards = [];
 var movesCounter = 0;
 var timer = {
   minutes :0,
   seconds: 0,
   timerId: -1
 } ;
 var time = document.querySelector('.time');
 var deck = document.querySelector('.deck');
 var restart = document.querySelector('.restart');
 
 function formatTime(time){
  if(time<10){
    time="0"+time;
  }
  return time;
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayGameBoard(){
  shuffledCards = shuffle(cardClasses);//store in array after shuffling
  console.log(shuffledCards)
  deck.innerHTML="";
  for(let i = 0; i< cardClasses.length; i++){
    let li = document.createElement('li');
  	li.classList.add('card');
    let id = "card"+i;
    li.id = id;
  	let icon = document.createElement('i');
  	icon.classList.add('fas');
    icon.classList.add(cardClasses[i]);
    li.appendChild(icon);
    deck.appendChild(li);
  }
startTimer();

console.log(restart)
}

displayGameBoard();

function restartGame(){
  timer.seconds = 0;
  timer.minutes = 0;
  clearInterval(timer.timerId);
  displayGameBoard();
}

function startTimer(){
  timer.timerId = setInterval(incrementTime, 1000);
}

function incrementTime(){
  timer.seconds += 1;
  if (timer.seconds > 59){
    timer.seconds = 0;
    timer.minutes += 1;
  }
  // display time
  // console.log(time);
  $('.time').text(formatTime(timer.minutes)+ ":"+ formatTime(timer.seconds));
}

//click handler to Reset timer and restart game
restart.addEventListener('click',function(){
restartGame();

});


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
