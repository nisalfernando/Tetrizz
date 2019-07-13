// Accessing the canvas
const canvas = document.querySelector("#tetris");
const context = canvas.getContext("2d");

// Making the pieces big
context.scale(20, 20);

// Drawing on canvas
context.fillStyle = "#000";
context.fillRect(0, 0, canvas.clientWidth, canvas.height);

// Creating T shaped piece
const matrix = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];

// Drawing the T shaped piece
function drawMatrix(matrix) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = "red";
                context.fillRect(x, y, 1, 1);
            }
        });
    });
}

drawMatrix(matrix);
