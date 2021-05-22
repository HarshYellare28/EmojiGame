//Array of cards created
const cards = document.querySelectorAll(".card");


//variables
var isFlipped = false;
var firstCard;
var secondCard;
var isTwiceClicked = false; 
var flips = 0;
var remainingPairs = 8;

//click event listener is added using ForEach loop
cards.forEach((card) => card.addEventListener("click", flip));

function flip() {
  if(!isTwiceClicked)
  {
    this.classList.add("flip");
    if (!isFlipped) {
      isFlipped = true;
      firstCard = this;
      flips++;
      scoreDisplay(); 
    } else {
      if(this !== firstCard)
      {
        secondCard = this;
        isTwiceClicked = true;
        flips++;
        scoreDisplay();
        checkIt();
      }      
    }
  }  
}

const checkIt = () => {
  //   console.log("Checking...");
  if (firstCard.dataset.image === secondCard.dataset.image) {
    success();
  } else {
    fail();
  }
}

const success = () => {
  remainingPairs--;
  scoreDisplay();
  firstCard.removeEventListener("click", flip);
  secondCard.removeEventListener("click", flip);
  reset();
}

const fail = () => {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
  }, 500);
}

const reset = () => {
  isFlipped = false;
  firstCard = null;
  secondCard = null;
  isTwiceClicked = false;
}

const scoreDisplay = () => {
  var rempair = document.querySelector(".rempairvalue");
  rempair.innerText = remainingPairs;
  var flipsvalue = document.querySelector(".clickvalue");
  flipsvalue.innerText = flips;
}


// feature:- (but buggy now)
// const retainedshuffle = document.querySelector(".retainedshuffle");
// retainedshuffle.addEventListener("click",retainedshufflefunc);

// function retainedshufflefunc(){
//   cards.forEach((card) => {
//       var index = Math.floor(Math.random() * 16);
//       card.style.order = index;
//     });
// }

const completeshuffle = document.querySelector(".restartbutton");
completeshuffle.addEventListener("click",completeshufflefunc);

function completeshufflefunc() {
  reset();
  flips = 0;
  remainingPairs = 8;
  scoreDisplay();
  cards.forEach((card) => card.classList.remove("flip"));
  setTimeout(() => {
    cards.forEach((card) => {
      var index = Math.floor(Math.random() * 16);
      card.style.order = index;
    });
  }, 500);
  cards.forEach((card) => card.addEventListener("click", flip));  
};


// A Self calling function to shuffle the cards on reload
(function reload() {
    cards.forEach((card) => {
      var index = Math.floor(Math.random() * 16);
      card.style.order = index;
    }); 
})();


