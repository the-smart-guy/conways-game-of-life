var rows = 20;
var cols = 20;
var board = [];

function Init() {
    // Generate Cells;
    for (var row = 0; row < rows; row++) {
        let cellRow = [];
        for (var col = 0; col < cols; col++) {
            cellRow[col] = Math.floor(Math.random() * 2);
        }
        board[row] = cellRow;
    }

    // Start Processing
    Process();
}

function Process() {
    Draw();
}

function Draw() {
    const canvas = document.getElementById("board");

    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(0, 0, 0)";

        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                if (board[row][col] == 1)
                {
                    ctx.fillRect((row * 10), (col * 10), 10, 10);
                }
            }
        }
    }
}

Init();