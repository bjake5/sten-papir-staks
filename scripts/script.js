/*

Write the logic to get the computer choice
Your game will be played against the computer. You will write a function that randomly returns “rock”, “paper” or “scissors”.

Create a new function named getComputerChoice.
Write the code so that getComputerChoice will randomly return one of the following string values: “rock”, “paper” or “scissors”.
Hint: The Math.random method returns a random number that’s greater than or equal to 0 and less than 1. Think about how you can use this to conditionally return one of the multiple choices.
Test that your function returns what you expect using console.log or the browser developer tools before advancing to the next step.

*/

function getComputerChoice() {
    const rawNumber = Math.random(); // The raw number is generated here.
    const mappedNumber = rawNumber * 3; // The raw number is mapped to create natural breakpoints for if/else logic statements without rounding.

    if(mappedNumber > 3) {
        alert("error, too high!") // Exception if the number is above 3 (not expected).
    } else if(mappedNumber > 2) {
        computerChoice = "scissors"; // Numbers between 2-3 inclusive will map to scissors.
    } else if (mappedNumber > 1) {
        computerChoice = "paper"; // Numbers between 1-2 inclusive will map to scissors.
    } else if (mappedNumber > 0 ) {
        computerChoice = "rock"; // Numbers between 0-1 inclusive will map to scissors.
    } else {
        alert("error, too low!") // Exception if the number is below 0 (not expected).
    }
    return computerChoice;
}

/*
Write the logic to get the human choice
Your game will be played by a human player. You will write a function that takes the user choice and returns it.

Create a new function named getHumanChoice.
Write the code so that getHumanChoice will return one of the valid choices depending on what the user inputs.
Hint: Use the prompt method to get the user’s input.
Test what your function returns by using console.log.
*/
const choices = ["rock", "paper", "scissors"];

function getHumanChoice () {
    const rawHumanInput = prompt("Please make your selection: rock, paper or scissors?");
    const mappedHumanInput = rawHumanInput.trim().toLowerCase();
    
    if (choices.includes(mappedHumanInput)) {
        humanChoice = mappedHumanInput;
        return humanChoice;
    } else {
        alert ("invalid choice, try again!")
        getHumanChoice();
    }
}

/*
Declare the players score variables
Your game will keep track of the players score. You will write variables to keep track of the players score.

Create two new variables named humanScore and computerScore in the global scope.
Initialize those variables with the value of 0.
*/

let humanScore = 0;
let computerScore = 0;

/*
Write the logic to play a single round
Your game will be played round by round. You will write a function that takes the human and computer player choices as arguments, plays a single round, increments the round winner’s score and logs a winner announcement.

Create a new function named playRound.
Define two parameters for playRound: humanChoice and computerChoice. Use these two parameters to take the human and computer choices as arguments.
Make your function’s humanChoice parameter case-insensitive so that players can input “rock”, “ROCK”, “RocK”, or other variations.
Write the code for your playRound function to console.log a string value representing the round winner, such as: “You lose! Paper beats Rock”.
Increment the humanScore or computerScore variable based on the round winner.
*/

function playRound (humanChoice, computerChoice) {
    if (humanChoice == computerChoice) { // Identify ties
        roundWinner = "nobody";
    } else if (humanChoice == "rock" && computerChoice == "paper") {
        roundWinner = "computer";
        computerScore++;
    } else if(humanChoice == "rock" && computerChoice == "scissors") {
        roundWinner = "human";
        humanScore++;
    } else if (humanChoice == "paper" && computerChoice == "scissors") {
        roundWinner = "computer";
        computerScore++;
    } else if(humanChoice == "paper" && computerChoice == "rock") {
        roundWinner = "human";
        humanScore++;
    } else if (humanChoice == "scissors" && computerChoice == "rock") {
        roundWinner = "computer";
        computerScore++;
    } else if(humanChoice == "scissors" && computerChoice == "paper") {
        roundWinner = "human";
        humanScore++;
    }

}

/*
Write the logic to play the entire game
Your game will play 5 rounds. You will write a function named playGame that calls playRound to play 5 rounds, keeps track of the scores and declares a winner at the end.

Create a new function named playGame.
Move your playRound function and score variables so that they’re declared inside of the new playGame function
Play 5 rounds by calling playRound 5 times.
Hint: When you assign a function call to a variable, the return value of that function is assigned to the variable. Accessing the variable afterward will only provide the assigned value; it doesn’t recall the function. You need to recall the choice functions to get new choices for each round.
Re-work your previous functions or create more helper functions if necessary. Specifically, you may want to change the return values to something more useful.
If you already know about loops, you can use them. If not, don’t worry! Loops will be covered in the next lesson.
*/

playGame ();

function playGame () {
    for(let i = 5; i > 0; i--) {
        console.log("Games Remaining: " + i);
        let humanSelection = getHumanChoice();
        let computerSelection = getComputerChoice();
        playRound(humanSelection, computerSelection);
    
        if (roundWinner == "human") {
            console.log(`You win! ${humanChoice} beats ${computerChoice}!`);
        } else if (roundWinner == "computer") {
            console.log(`You lose! ${computerChoice} beats ${humanChoice}!`);
        } else {
            console.log(`You tied! ${computerChoice} ties ${humanChoice}!`);
        }

        console.log("Human Wins: " + humanScore + " | " + "Computer Wins: " + computerScore);
    }
    
    if(humanScore > computerScore) {
        gameWinner = "human";
        alert(`The human wins! :) ${humanScore} games to ${computerScore} games!`);
    } else if (computerScore > humanScore) {
        gameWinner = "computer";
        alert(`The computer wins! :( ${computerScore} games to ${humanScore} games!`);
    } else {
        gameWinner = "nobody";
        alert(`Tie! ${computerScore} games to ${humanScore} games!`);
    }
    console.log(`The game winner is the ${gameWinner}!`);
    return gameWinner;
}