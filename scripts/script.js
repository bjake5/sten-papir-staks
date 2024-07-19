
// List of player object IDs from HTML page 
const playerSection = document.querySelector("#player");
const playerRockButton = document.querySelector("#player-rock-selection");
const playerPaperButton = document.querySelector("#player-paper-selection");
const playerScissorsButton = document.querySelector("#player-scissors-selection");
const playerScoreCopy = document.querySelector("#playerScoreCopy");
const playerHeadline = document.querySelector("#playerHeadline");
const playerLastSelection = document.querySelector("#playerLastSelection");
const buttons = document.querySelectorAll("button");

//List of computer object IDs from HTML page
const computerSection = document.querySelector("#computer");
const computerHeadline = document.querySelector("#computerHeadline");
const computerLastSelection = document.querySelector("#computerLastSelection");
const computerScoreCopy = document.querySelector("#computerScoreCopy");

// Section for play again button after game is finished
const playAgainSection = document.querySelector("#playAgain");

// List of constant variables for copy, colors, etc.
const defaultFontColor = '#2f4f4f';
const playerWinHeadline = "You won the round!";
const computerWinHeadline = "Computer won the round!"
const playerLossHeadline = "You lost the round!"
const computerLossHeadline = "Computer lost the round!"
const tieHeadline = "You tied the round!"
const winFontColor = '#7cb69d';
const lossFontColor = '#f69697';

// Temporary variables for gameplay
let humanChoice;
let humanScore = 0;
let computerScore = 0;
let roundWinner = "";
//

//Setup initial score copy + buttons
playerScoreCopy.textContent = `Current Score: ${humanScore}`;
computerScoreCopy.textContent = `Current Score: ${computerScore}`;

// Use the .forEach method to iterate through each button on the page
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if(humanScore >= 5 || computerScore >= 5) { // Check if the game is over before starting another round
            return false;
        } else { // Map button IDs to human choice variable for gameplay
            if(button.id == "player-rock-selection") { humanChoice = "rock" };
            if(button.id == "player-paper-selection") { humanChoice = "paper" }; 
            if(button.id == "player-scissors-selection") { humanChoice = "scissors" }; 

            let humanSelection = humanChoice; // Map human choice variable into an argument
            let computerSelection = getComputerChoice(); // Get the computer choice for gameplay
            playRound(humanSelection,computerSelection); // Function to play the round
        };
        if(humanScore >= 5 || computerScore >= 5) { // Check if the game is over after round
            finishGame(); // Function to finish the game for code cleanliness
        } 
    });
});

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
    };
    return computerChoice;
};

function playRound (humanChoice, computerChoice) {
    if (humanChoice == computerChoice) { // Identify ties first, then run algorithm
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
    };
    updateRoundCopy();
};    
    
// Update the copy across the user interface
function updateRoundCopy(){
    
    // Update the copy with what the last selection was
    playerLastSelection.textContent = humanChoice;
    computerLastSelection.textContent = computerChoice;
    
    // Update the current scores
    playerScoreCopy.textContent = `Current Score: ${humanScore}`;
    computerScoreCopy.textContent = `Current Score: ${computerScore}`;

    // Update the copy per round winner including text and colors
    if (roundWinner == "human") {
        playerHeadline.style.color = winFontColor;
        playerLastSelection.style.color = winFontColor;
        computerHeadline.style.color = lossFontColor;
        computerLastSelection.style.color = lossFontColor;
        playerHeadline.textContent = playerWinHeadline;
        computerHeadline.textContent = computerLossHeadline;
    } else if (roundWinner == "computer") {
        playerHeadline.style.color = lossFontColor;
        playerLastSelection.style.color = lossFontColor;
        computerHeadline.style.color = winFontColor;
        computerLastSelection.style.color = winFontColor;
        playerHeadline.textContent = playerLossHeadline;
        computerHeadline.textContent = computerWinHeadline;
    } else {
        playerHeadline.style.color = defaultFontColor;
        playerLastSelection.style.color = defaultFontColor;
        computerHeadline.style.color = defaultFontColor;
        computerLastSelection.style.color = defaultFontColor;
        playerHeadline.textContent = tieHeadline;
        computerHeadline.textContent = tieHeadline;
    };
};

// Update interface to show final score, declare winner, and add Play again? button
function finishGame() {
    if(humanScore > computerScore) {
        playerSection.style.backgroundColor = winFontColor;
        playerLastSelection.style.color = defaultFontColor;
        playerHeadline.textContent = "\u{1F3C6}";
        playerHeadline.style.fontSize = "50psx";
        computerHeadline.textContent = "Computer lost the game!"

    } else {
        computerSection.style.backgroundColor = winFontColor;
        computerLastSelection.style.color = defaultFontColor;
        computerHeadline.textContent = "\u{1F3C6}";
        computerHeadline.style.fontSize = "50px";
        playerHeadline.textContent = "Player lost the game!"
    }
    const playAgainButton = document.createElement("button");
    playAgainSection.appendChild(playAgainButton);
    playAgainButton.style.color = defaultFontColor;
    playAgainButton.textContent = "Play again?";

    // Reload page onClick Play again? button
    playAgainButton.addEventListener("click", () => {
        location.reload(true);
    });
}