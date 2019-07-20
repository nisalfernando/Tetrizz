// Accessing the canvas
const canvas = document.querySelector("#tetris");
const context = canvas.getContext("2d");

// Making the pieces big
context.scale(20, 20);

// Creating T shaped piece
const matrix = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];

// Collide function
function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (
                m[y][x] !== 0 &&
                (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0
            ) {
                return true;
            }
        }
    }
    return false;
}

// To save the all stuck pieces
function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

// General draw function
function draw() {
    // Drawing on canvas
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.clientWidth, canvas.height);

    drawMatrix(arena, { x: 0, y: 0 });
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

// Merge function
function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

// For the down arrow key
function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
    }
    dropCounter = 0;
}

// To move the piece
function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function rotete(matrix, dir) {
    for (let y = 0; y < matrix.length; ++x) {
        for (let x = 0; x < y; ++x) {}
    }
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
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}

// Calling the function
const arena = createMatrix(12, 20);

// Player's structure
const player = {
    pos: { x: 5, y: 5 },
    matrix: matrix
};

// Keyboard control
document.addEventListener("keydown", event => {
    // Using keyCodes to control the pieces
    if (event.keyCode === 37) {
        playerMove(-1);
    } else if (event.keyCode === 39) {
        playerMove(1);
    } else if (event.keyCode === 40) {
        playerDrop();
    }
});

update();
