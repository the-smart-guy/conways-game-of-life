const rows = 100;
const cols = 100;
var board = [];
const canvas = document.getElementById("board");
const context = canvas.getContext("2d");
context.fillStyle = "rgb(0, 0, 0)";

async function Init() {
    // Generate Cells;
    for (let row = 0; row < rows; row++) {
        let cellRow = [];
        for (let col = 0; col < cols; col++) {
            cellRow[col] = Math.floor(Math.random() * 2);
        }
        board[row] = cellRow;
    }

    // Start Processing
    setInterval(async () => { await Process(); }, 100);
}

async function Process() {
    Draw();
    CreateNextGen();
}

async function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] == 1) {
                context.fillRect((row * 10), (col * 10), 10, 10);
            }
        }
    }
}

async function CreateNextGen() {
    let nextGenBoard = [];
    for (let row = 0; row < rows; row++) {
        let cellRow = [];
        for (var col = 0; col < cols; col++) {
            // set cell value
            cellRow[col] = await GetNextGenCellStatus(row, col);
        }
        nextGenBoard[row] = cellRow;
    }

    board = nextGenBoard;
}

async function GetNextGenCellStatus(row, col) {
    let neighbours = await GetNeighbours(row, col);
    if (neighbours == 2 || neighbours == 3) return 1;
    else if (neighbours > 3 || neighbours < 2) return 0;
    else return 0;
}

async function GetNeighbours(row, col) {
    if (row == 0 || col == 0 || row == (rows - 1) || col == (cols - 1)) return 0;

    let neighbours = 0;
    neighbours += board[row - 1][col - 1];
    neighbours += board[row - 1][col];
    neighbours += board[row - 1][col + 1];
    neighbours += board[row][col - 1];
    neighbours += board[row][col + 1];
    neighbours += board[row + 1][col - 1];
    neighbours += board[row + 1][col];
    neighbours += board[row + 1][col + 1];

    console.log(neighbours);

    return neighbours;
}

Init();