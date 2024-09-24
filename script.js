// Array to represent the board cells
var arr = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);
    }
}

// Board data
var board = [[], [], [], [], [], [], [], [], []];

// Function to fill the board in the UI
function FillBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                arr[i][j].innerText = board[i][j];
            } else {
                arr[i][j].innerText = '';
            }
        }
    }
}

// Get references to buttons
let GetPuzzle = document.getElementById('GetPuzzle');
let SolvePuzzle = document.getElementById('SolvePuzzle');

// Detect if we're running on GitHub Pages
const isDeployed = window.location.href.includes("github.io");

// Use CORS proxy only when deployed
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_URL = isDeployed
    ? `${CORS_PROXY}https://sugoku.onrender.com/board?difficulty=easy`
    : "https://sugoku.onrender.com/board?difficulty=easy";

// Function to handle puzzle fetch
GetPuzzle.onclick = async function () {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch the puzzle');
        const data = await response.json();
        console.log(data); // Log the data for debugging
        board = data.board;
        FillBoard(board);
    } catch (error) {
        console.error('Error fetching puzzle:', error);
    }
};

// Sudoku solver algorithm (already present in your code)
SolvePuzzle.onclick = () => {
    sudukoSolver(board, 0, 0, 9);
};

function isSafe(board, row, col, val, n) {
    for (let i = 0; i < n; i++) {
        if (board[row][i] == val || board[i][col] == val) return false;
    }
    let rn = Math.sqrt(n);
    let si = row - row % rn;
    let sj = col - col % rn;
    for (let x = si; x < si + rn; x++) {
        for (let y = sj; y < sj + rn; y++) {
            if (board[x][y] == val) {
                return false;
            }
        }
    }
    return true;
}

function sudukoSolver(board, row, col, n) {
    if (row == n) {
        FillBoard(board);
        return true;
    }
    if (col == n) {
        return sudukoSolver(board, row + 1, 0, n);
    }
    if (board[row][col] != 0) {
        return sudukoSolver(board, row, col + 1, n);
    }
    for (let val = 1; val <= 9; val++) {
        if (isSafe(board, row, col, val, n)) {
            board[row][col] = val;
            let aagesolpossible = sudukoSolver(board, row, col + 1, n);
            if (aagesolpossible) {
                return true;
            }
            board[row][col] = 0;
        }
    }
    return false;
}
