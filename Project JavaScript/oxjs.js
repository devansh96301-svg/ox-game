let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;   // O starts first
let moveCount = 0; // for draw check

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

// RESET GAME
const resetGame = () => {
    turnO = true;
    moveCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// BOX CLICK
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#1B263B";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#121417";
            turnO = true;
        }

        box.disabled = true;
        moveCount++;

        checkWinner();
    });
});

// DISABLE ALL BOXES
const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

// ENABLE ALL BOXES
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// SHOW WINNER
const showWinner = (winner) => {
    msg.innerText = `🎉 Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// SHOW DRAW
const showDraw = () => {
    msg.innerText = "😐 Match Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// CHECK WINNER OR DRAW
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let a = boxes[pattern[0]].innerText;
        let b = boxes[pattern[1]].innerText;
        let c = boxes[pattern[2]].innerText;

        if (a !== "" && a === b && b === c) {
            showWinner(a);
            return;
        }
    }

    // DRAW CONDITION
    if (moveCount === 9) {
        showDraw();
    }
};

// BUTTON EVENTS
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);