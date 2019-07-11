// Accessing the canvas
const canvas = document.querySelector("#tetris");
const context = canvas.getContext("2d");

// Drawing on canvas
context.fillStyle = "#000";
context.fillRect(0, 0, canvas.clientWidth, canvas.height);
