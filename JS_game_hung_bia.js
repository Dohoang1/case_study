let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let basket = {
    width: 150,
    height: 20,
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    dx: 10,
    movingLeft: false,
    movingRight: false,
    color : getRandomColor()
};

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let beer = {
    x: Math.random() * (canvas.width),
    y: 0,
    width: 20,
    height: 30,
    dy: 3,
    color: getRandomColor(),
};

let score = 0;
let isGameOver = false;

function drawBackground() {
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#2accfd'); // Sky blue
    gradient.addColorStop(1, '#c9efff'); // Deep sky blue

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBasket() {
    ctx.fillStyle = basket.color;
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawBeer() {
    ctx.fillStyle = beer.color;    ;
    ctx.fillRect(beer.x, beer.y, beer.width, beer.height);
}

function drawScore() {
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 20, 30);
}

function drawGameOver() {
    ctx.fillStyle = "#FF0000";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
}

function update() {
    if (isGameOver) return;

    if (basket.movingLeft) {
        basket.x -= basket.dx;
        if (basket.x < 0) basket.x = 0;
    }
    if (basket.movingRight) {
        basket.x += basket.dx;
        if (basket.x + basket.width > canvas.width) basket.x = canvas.width - basket.width;
    }

    for (let i = 1; i <= score / 5; i++) {
        beer.dy = 3 + i;
    }

    beer.y += beer.dy;

    if (
        beer.y + beer.height >= basket.y &&
        beer.x + beer.width >= basket.x &&
        beer.x <= basket.x + basket.width
    ) {
        score++;
        resetBeer();
    }

    if (beer.y + beer.height >= canvas.height) {
        isGameOver = true;
    }
}

function resetBeer() {
    beer.x = Math.random() * (canvas.width - beer.width);
    beer.y = 0;
    beer.dy = 3;
    beer.color = getRandomColor();
}

function gameLoop() {
    drawBackground();
    drawBasket();
    drawBeer();
    drawScore();
    let img = document.getElementById("frog");

    if (isGameOver) {
        drawGameOver();
        img.src = "frog2.jfif"
    } else {
        if (score >=10) img.src = "frog4.jpg"
        if (score >=20) img.src = "frog5.jpg"
        if (score >=30) img.src = "frog6.jpg"
        if (score >=40) img.src = "frog7.jpg"
        update();
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener("keydown", (event) => {
    if (event.keyCode === 37) {
        basket.movingLeft = true;
    } else if (event.keyCode === 39) {
        basket.movingRight = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.keyCode === 37) {
        basket.movingLeft = false;
    } else if (event.keyCode === 39) {
        basket.movingRight = false;
    }
});

requestAnimationFrame(gameLoop);
