document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements
  let boxes = document.querySelectorAll(".box");
  let resetBtn = document.querySelector("#reset-btn");
  let newGameBtn = document.querySelector("#new-btn");
  let msgContainer = document.querySelector(".msg-container");
  let msg = document.querySelector("#msg");

  // Initialize game variables
  let turnO = true; // playerX, playerO
  let count = 0; // To Track Draw

  // Winning patterns for Tic-Tac-Toe
  const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  // Function to reset the game
  const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
  };

  // Add click event listeners to each box
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnO) {
        // playerO's turn
        box.innerText = "O";
        turnO = false;
      } else {
        // playerX's turn
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true;
      count++;

      // Check for winner
      let isWinner = checkWinner();

      // If all boxes are filled and no winner, it's a draw
      if (count === 9 && !isWinner) {
        gameDraw();
      }
    });
  });

  // Function for a draw game
  const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

  // Disable all boxes (after game ends)
  const disableBoxes = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };

  // Enable all boxes (reset game)
  const enableBoxes = () => {
    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  };

  // Function to show the winner message
  const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

  // Function to check if there is a winner
  const checkWinner = () => {
    for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;

      if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
          showWinner(pos1Val);
          return true;
        }
      }
    }
  };

  // Event listener for the "New Game" button
  newGameBtn.addEventListener("click", resetGame);

  // Event listener for the "Reset Game" button
  resetBtn.addEventListener("click", resetGame);
});