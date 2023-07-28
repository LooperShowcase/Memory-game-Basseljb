
const cardsContainer = document.getElementById("cards");

document.getElementById("restartButton").style.display = "none"
let Firstcard , Secondcard;
let cards = [];
let score = 0;
let lockBoard = false;

document.getElementById("score").textContent = "Score: "+ score;

fetch("./data/cards.json")
.then((res) => res.json())
.then((data) => {
    cards = [...data,...data];
    shuffleCards();
    generateCards();
    console.log(cards);
})

function shuffleCards() {
    let currentIndex = cards.length;
    let randomIndex;
    let tempValue;

    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--;
        tempValue = cards[currentIndex];
      
        cards[currentIndex] = cards[randomIndex]
        cards[randomIndex] = tempValue;
}
}

function generateCards(){
    for (let card of cards){
        const cardElment = document.createElement("div");
        cardElment.classList.add("card");

        cardElment.setAttribute("data-name" , card.name)
        cardElment.innerHTML=`<div class="front">
        <img class="front-image" src=${card.image}>
        </div>
        
        <div class="back"></div>
        `;
        cardsContainer.appendChild(cardElment);
        cardElment.addEventListener("click", flipCards);
        cardElment.addEventListener("touch", flipCards);
    }

}

function flipCards(){
    if(lockBoard) return;
    if(this === Firstcard) return;
    this.classList.add("flipped");

    if(!Firstcard){
        Firstcard = this;
        return;

    }
    Secondcard = this;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch(){
    let isMatch = Firstcard.dataset.name === Secondcard.dataset.name
    if(isMatch){
        disableCards();
    }
    else{
        unflipCards();
    }
}

function disableCards (){
Firstcard.removeEventListener("click", flipCards);
Secondcard.removeEventListener("click", flipCards);
Firstcard.removeEventListener("touch", flipCards);
Secondcard.removeEventListener("touch", flipCards);
score++
document.getElementById("score").textContent = "Score: "+ score;

unlockBoard();

}

 function unlockBoard(){
    Firstcard = null;
    Secondcard = null;
    lockBoard = false;
 }

 function unflipCards () {
 setTimeout(() => {
    Firstcard.classList.remove("flipped")
    Secondcard.classList.remove("flipped")
    unlockBoard();
 }, 1000);
 }

if(score === 9){
    document.getElementById("restartButton").style.display = "block"
}
else{
    document.getElementById("restartButton").style.display = "none"
}

 function restart() {
    
    shuffleCards();
    unlockBoard();
    cardsContainer.innerHTML = "";
    generateCards();
    score = 0;
    document.getElementById("score").textContent = score;
    
 }