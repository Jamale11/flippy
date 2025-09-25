const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

let bird = { x: 50, y: 200, size: 20, gravity: 0.5, lift: -8, velocity: 0 };
let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.size, 0, Math.PI * 2);
  ctx.fill();
}

function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
  });
}

function update() {
  if (gameOver) return;

  frame++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird physics
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.size > canvas.height || bird.y - bird.size < 0) {
    endGame();
  }

  // Add pipes
  if (frame % 100 === 0) {
    let gap = 120;
    let top = Math.random() * (canvas.height - gap - 100) + 50;
    pipes.push({
      x: canvas.width,
      width: 40,
      top: top,
      bottom: canvas.height - top - gap
    });
  }

  // Move pipes
  pipes.forEach(pipe => {
    pipe.x -= 2;

    // Collision detection
    if (
      bird.x + bird.size > pipe.x &&
      bird.x - bird.size < pipe.x + pipe.width &&
      (bird.y - bird.size < pipe.top ||
        bird.y + bird.size > canvas.height - pipe.bottom)
    ) {
      endGame();
    }

    // Score
    if (pipe.x + pipe.width === bird.x) {
      score++;
      scoreEl.textContent = score;
    }
  });

  // Remove off-screen pipes
  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);

  drawBird();
  drawPipes();

  requestAnimationFrame(update);
}

function endGame() {
  gameOver = true;
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText("Game Over!", 120, canvas.height / 2);
}

function flap() {
  if (!gameOver) {
    bird.velocity = bird.lift;
  } else {
    // Restart game
    bird.y = 200;
    bird.velocity = 0;
    pipes = [];
    frame = 0;
    score = 0;
    scoreEl.textContent = score;
    gameOver = false;
    update();
  }
}

canvas.addEventListener("click", flap);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") flap();
});

update();
