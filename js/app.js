/*
 * Create a list that holds all of your cards
 */
 const cardClasses = ["fa-gem", "fa-gem", "fa-plane", "fa-plane", "fa-anchor", "fa-anchor",
            "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
            "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

// game variables
 let openedCards = [];
 let shuffledCards = [];
 let movesCounter = 0;
 let timer = {
   minutes :0,
   seconds: 0,
   timerId: -1
 } ;
 let temp = null;
 let isfirstClick = true;
 let time = document.querySelector('.time');
 let deck = document.querySelector('.deck');
 let restart = document.querySelector('.restart');
 let card1,card2;
 let moves = document.querySelector('.moves');
 let stars = document.querySelector('.stars');
 let modal = document.querySelector('.modal');
 let winMessage = document.querySelector('.winMessage');
 let wonCards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayGameBoard(){
  shuffledCards = shuffle(cardClasses);//store in array after shuffling
  // console.log(shuffledCards)
  deck.innerHTML="";
  for(let i = 0; i< cardClasses.length; i++){
    let li = document.createElement('li');
  	li.classList.add('card');
    let id = i;
    li.id = id;
  	let icon = document.createElement('i');
  	icon.classList.add('fas');
    icon.classList.add(cardClasses[i]);
    li.appendChild(icon);
    deck.appendChild(li);

  }
  startGame();
}

displayGameBoard();

function startGame(){
var cards = document.querySelectorAll('.card');
cards.forEach(function(card){
  card.addEventListener("click", handleClickEvent)
});
}

function handleClickEvent(){
  if (isfirstClick)
      { startTimer() }
      isfirstClick = false;
      // console.log($(this)[0].getAttribute("id"));
$(this).addClass("open show")
temp = $(this);
// console.log("temp:",temp[0]);
addToOpenedCards(temp[0]);
}

function addToOpenedCards(addcard){
  // var temp = $(this)[0];
  if(openedCards.length < 2 && openedCards[0]!= addcard) {
  openedCards.push(addcard);
  // console.log("add to open",openedCards);
  // console.log("length: ",openedCards.length)
}
if (openedCards.length==2) {
  compareCards(openedCards);
  // incrementMoves();
}
}

// compare both cards
function compareCards(openedCards){
   card1 = openedCards[0];
   card2 = openedCards[1];
   incrementMoves();
   updateStars();
  // console.log("card1: ",card1.children[0].className);
  // console.log("card2: ",card2.children[0].className);
  if (card1.children[0].className == card2.children[0].className) {
    wonCards.push(card1.children[0].className);
    handleMatch(card1,card2)
  } else {
    handleMismatch(card1,card2)
  }

}

// increment moves
function incrementMoves(){
  movesCounter += 1;
  moves.textContent = movesCounter;
  // console.log("moves: ",movesCounter);
}

// remove stars based on moves
function updateStars(){
  if (movesCounter < 15){
    winMessage.textContent = 'Congratulations! You are Awesome.';

  } else if (movesCounter > 14 && movesCounter < 24) {
    winMessage.textContent = 'Good! You can improve.';
    stars.lastElementChild.children[0].classList.remove("fa");
    stars.lastElementChild.children[0].classList.add("far");
  } else {
    winMessage.textContent = 'Oops! You are a disaster.';
    stars.children[1].children[0].classList.remove("fa");
    stars.children[1].children[0].classList.add("far");
  }
}

// show success for matched cards and remove listeners
function handleMatch(card1,card2){
  // console.log("matched")
  // console.log("woncards:",wonCards);
  // console.log(card1)
  // console.log(card2)
  card1.classList.add("match");
  card2.classList.add("match");
  card1.removeEventListener('click',handleClickEvent);
	card2.removeEventListener('click',handleClickEvent);
  openedCards = [];
  temp= null;
  // final win condition
  if (wonCards.length == 8) {
    // console.log("congrats.");
    displayWinMessage();
  }
}

// show fail for mismatch
function handleMismatch(card1,card2){
  // console.log("not matched");
  // console.log("from compare",openedCards)
  // console.log("from compare:",temp);
  card1.classList.toggle("mismatch");
  card2.classList.toggle("mismatch");
  setTimeout(delay, 1000);
  openedCards = [];
  temp= null;

}

function delay(){
  card1.classList.remove("open");
  card1.classList.remove("show");
  card2.classList.remove("show");
  card2.classList.remove("open");
  card1.classList.toggle("mismatch");
  card2.classList.toggle("mismatch");
}

function restartGame(){
  stars.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`;
  wonCards = [];
  openedCards = [];
  movesCounter = 0;
  isfirstClick = true;
  timer.seconds = 0;
  timer.minutes = 0;
  clearInterval(timer.timerId);
  $('.time').text(formatTime(timer.minutes)+ ":"+ formatTime(timer.seconds));
  moves.textContent = movesCounter;
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
  $('.time').text(formatTime(timer.minutes)+ ":"+ formatTime(timer.seconds));
}

// open modal popup
function displayWinMessage(){
  modal.style.display = 'block';
  var starRating = document.querySelector(".stars").innerHTML;
  $('.time').text(formatTime(timer.minutes)+ ":"+ formatTime(timer.seconds));
  moves.textContent = movesCounter;
  document.getElementById("starRating").innerHTML = starRating;
  clearInterval(timer.timerId);
  // console.log("final moves:",movesCounter);
  document.getElementById("totalMoves").textContent = movesCounter;
}

function formatTime(time){
 if(time<10){
   time="0"+time;
 }
 return time;
}

document.querySelector('.playAgain').addEventListener('click',function(){
	modal.style.display = 'none';
	restartGame();
})
//click handler to Reset timer and restart game
restart.addEventListener('click',restartGame);

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
