// Accessing the canvas
const canvas = document.querySelector("#tetris");
const context = canvas.getContext("2d");

// Making the pieces big
context.scale(20, 20);

// Creating T shaped piece
const matrix = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];

// General draw function
function draw() {
    // Drawing on canvas
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.clientWidth, canvas.height);
    drawMatrix(player.matrix, player.pos);
}

// Drawing the T shaped piece
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = "red";
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

// Draw game continuesly even when change the position
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    // making drop
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        player.pos.y++;
        dropCounter = 0;
    }

    draw();
    requestAnimationFrame(update);
}

// Player's structure
const player = {
    pos: { x: 5, y: 5 },
    matrix: matrix
};

// Keyboard control
document.addEventListener("keydown", event => {
    // Using keyCodes to control the pieces
    if (event.keyCode === 37) {
        player.pos.x--;
    } else if (event.keyCode === 39) {
        player.pos.x++;
    } else if (event.keyCode === 40) {
        player.pos.y++;
        dropCounter = 0;
    }
});

update();
