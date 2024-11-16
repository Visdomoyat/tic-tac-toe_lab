/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
    [0, 4, 8], [2, 4, 6] //diagonals
]


/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
let sqaureIndex


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const boardContainer = document.querySelector('.board')

// creating reset button

const resetBtnEl = document.createElement('button')
resetBtnEl.id = "reset";
resetBtnEl.textContent = "Reset Game";
document.body.appendChild(resetBtnEl);

/*-------------------------------- Functions --------------------------------*/
function init() {
    board = Array(9).fill('') // means 9 arrays
    // board = ['X', 'O', ' ', 'X', 'O', ' ', 'X', 'O', 'X',]
    turn = "X"; // current player
    winner = false;
    tie = false;
    render();
    reset();
}

function render() {
    updateBoard();
    updateMessage();
}
function updateBoard() {
    board.forEach((mark, index) => {
        const square = squareEls[index];
        square.textContent = mark
    })
}

function updateMessage() {
    if (winner === true && tie === false) {
        messageEl.textContent = `congratulation ${turn} Wins`
    } else if (winner === false && tie === true) {
        messageEl.textContent = `it is a tie`
    } else if (winner === false && tie === false) {
        messageEl.textContent = `current turn: ${turn}`
    }
}

function handleClick(event) {
    // console.log(event.target.id)
    sqaureIndex = parseInt(event.target.id);
    if (board[sqaureIndex] || winner === true) return;

    placePiece(sqaureIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index) {
    board[index] = turn
    console.log(board)
}

function checkForWinner() {
    for (const combo of winningCombos) {
        // console.log(combo)
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            winner = true;
            console.log('Winner:', winner)
            return;
        }
    }
}

function checkForTie() {
    if (winner === true) return;
    tie = board.every(cell => cell != "");
    console.log('Tie:' +tie);
}

function switchPlayerTurn() {
    if (winner === true) return;
    // turnary operator instead of using if-else
    turn = turn === "X" ? "O" : "X";
    //the above is saying if variable = if condition is true ? pass this value : else this one
    console.log("current Turn:" +turn)
}

function reset() {

}
/*----------------------------- Event Listeners -----------------------------*/
// boardContainer.addEventListener('click', handleClick)
squareEls.forEach(square => {
    square.addEventListener('click', handleClick)
})

resetBtnEl.addEventListener('click', init)


init();

