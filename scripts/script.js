
// List of player object IDs from HTML page 
const playerTitle = document.querySelector("#player");
const playerRockButton = document.querySelector("#player-actions-rock-selection");
const playerPaperButton = document.querySelector("#player-actions-paper-selection");
const playerScissorsButton = document.querySelector("#player-actions-scissors-selection");
const playerScoreCopy = document.querySelector("#player-content-score-copy");
const playerHeadline = document.querySelector("#player-content-headline");
const playerLastSelection = document.querySelector("#player-content-last-selection");
const playerGameResult = document.querySelector("#player-content-game-result");
const playerActions = document.querySelector("#player-actions");
const buttons = document.querySelectorAll("button");

//List of computer object IDs from HTML page
const computerTitle = document.querySelector("#computer");
const computerHeadline = document.querySelector("#computer-content-headline");
const computerLastSelection = document.querySelector("#computer-content-last-selection");
const computerScoreCopy = document.querySelector("#computer-content-score-copy");
const computerGameResult = document.querySelector("#computer-content-game-result");
const computerActions = document.querySelector("#computer-actions");

// Section for play again button after game is finished
const playAgainSection = document.querySelector("#play-again");

// List of constant variables for copy, colors, etc.
const defaultFontColor = '#2f4f4f';
const playerWinHeadline = "You won!";
const computerWinHeadline = "Computer won!"
const playerLossHeadline = "You lost!"
const computerLossHeadline = "Computer lost!"
const tieHeadline = "You tied!"
const winFontColor = '#7cb69d';
const lossFontColor = '#f69697';
const winEmoji = "\u{1F3C6}";
const lossEmoji = "\u{1F91D}";

// Temporary variables for gameplay
let humanChoice;
let humanScore = 0;
let computerScore = 0;
let roundWinner = "";
//

//Setup initial score copy + buttons
playerScoreCopy.textContent = `Score: ${humanScore}`;
computerScoreCopy.textContent = `Score: ${computerScore}`;

// Use the .forEach method to iterate through each button on the page
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if(humanScore >= 5 || computerScore >= 5) { // Check if the game is over before starting another round
            return false;
        } else { // Map button IDs to human choice variable for gameplay
            if(button.id == "player-actions-rock-selection") { humanChoice = "rock" };
            if(button.id == "player-actions-paper-selection") { humanChoice = "paper" }; 
            if(button.id == "player-actions-scissors-selection") { humanChoice = "scissors" }; 

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
    playerScoreCopy.textContent = `Score: ${humanScore}`;
    computerScoreCopy.textContent = `Score: ${computerScore}`;

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
        playerTitle.style.backgroundColor = winFontColor;
        playerActions.style.backgroundColor = winFontColor;
        playerLastSelection.style.color = defaultFontColor;
        playerHeadline.style.color = defaultFontColor;
        playerHeadline.textContent = "You won the game!";
        playerGameResult.textContent = winEmoji;
        computerHeadline.textContent = "Computer lost the game!"
        computerGameResult.textContent = lossEmoji;

    } else {
        computerTitle.style.backgroundColor = winFontColor;
        computerActions.style.backgroundColor = winFontColor;
        computerHeadline.style.color = defaultFontColor;
        computerLastSelection.style.color = defaultFontColor;
        computerHeadline.textContent = "Computer won the game!";
        computerGameResult.textContent = winEmoji;
        playerHeadline.textContent = "You lost the game!"
        playerGameResult.textContent = lossEmoji;

    }
    playerRockButton.remove();
    playerPaperButton.remove();
    playerScissorsButton.remove();
    const playAgainButton = document.createElement("button");
    playAgainSection.appendChild(playAgainButton);
    playAgainButton.style.color = defaultFontColor;
    playAgainButton.textContent = "Play Again?";
    
    // Reload page onClick Play again? button
    playAgainButton.addEventListener("click", () => {
        location.reload(true);
    });
}