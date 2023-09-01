const gameContainer = document.getElementById("game");
const gameTries = document.querySelector("#tries");
const winScreen = document.querySelector("#winScreen");
const divArray = [];
let choiceNum = 1;
let choice1;
let choice2;
let score = 0;
let tries = 0;

// NOTE: For getting the end game I'll implement it so that when score is equal to colors.length/2
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// event listeners

function isMatched(choice1, choice2) {
  return choice1.classList[0] === choice2.classList[0];
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // in case I need to remove newDiv event listener
    divArray.push(newDiv);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // Actual design elements to see what color you picked
  event.target.style.backgroundColor = `${event.target.classList[0]}`;

  // Logic for checking what click

  if (choiceNum == 1) {
    choice1 = event.target;
    choiceNum++;
  } else if (choiceNum == 2 && !(event.target == choice1)) {
    // we don't want to click the same card twice
    choice2 = event.target;
    choiceNum++;
  }
  console.log(`${choice1} == ${event.target}`);

  if (choiceNum == 3) {
    removeDivEventListeners(divArray);
    if (isMatched(choice1, choice2)) {
      event.target.style.backgroundColor = `${event.target.classList[0]}`;
      score++;
      if (score == COLORS.length / 2) {
        // Win condition
        console.log("Got here numbskull");
      }
      addDivEventListeners(divArray, choice1, choice2);
    } 
    else {
      setTimeout(function(){
        choice1.style.backgroundColor = "#415A77";
        choice2.style.backgroundColor = "#415A77";
        addDivEventListeners(divArray);
      }, 1000);
    }
    choiceNum = 1;
    tries++;
    gameTries.innerText = `Tries: ${tries}`;
  }
}

function removeDivEventListeners(arrOfDivs){
  for (let i of arrOfDivs){
    i.removeEventListener("click", handleCardClick);
  }
}

// addDivEventListeners in case choice1 and choice2 are matches, I don't need to click on them again
function addDivEventListeners(arrOfDivs, choice1, choice2){
  for (let i of arrOfDivs){
    if (!(choice1 == i || choice2 == i)){
      i.addEventListener("click", handleCardClick);
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
