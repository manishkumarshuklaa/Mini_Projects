const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sizeEl = document.getElementById('size'); 
const colorInput = document.getElementById('color'); 
const clearBtn = document.getElementById('clear'); 
const decreaseBtn = document.getElementById('decrease'); 
const increaseBtn = document.getElementById('increase'); 


let size = parseInt(sizeEl.innerText); 
let color = colorInput.value;
let isPressed = false;
let x;
let y;

ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.strokeStyle = color;
ctx.fillStyle = color;
ctx.lineWidth = size * 2;



increaseBtn.addEventListener('click', () => {
    size += 1;
    if (size > 50) { 
        size = 50;
    }
    updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
    size -= 1;
    if (size < 1) { 
        size = 1;
    }
    updateSizeOnScreen();
});

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

colorInput.addEventListener('change', (e) => {
    color = e.target.value; 
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
});

function updateSizeOnScreen() {
    sizeEl.innerText = size; 
    ctx.lineWidth = size * 2; 
}

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2); 
        drawLine(x, y, x2, y2); 

        x = x2;
        y = y2;
    }
});


function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2); 
    ctx.fillStyle = color; 
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color; 
    ctx.lineWidth = size * 2; 
    ctx.stroke();
}