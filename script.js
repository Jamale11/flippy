const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ukuran canvas
canvas.width = 320;
canvas.height = 480;

// Gambar burung
let bird = new Image();
bird.src = "bg.png";

// Posisi burung
let bx = 30;
let by = 130;
let gravity = 0.5;
let velocity = 0;

// Pipa
let pipeWidth = 50;
let pipeGap = 120;
let pipes = [{ x: canvas.width, y: 0 }];

// Skor
let score = 0;

// Kontrol
document.addEventListener("keydown", jump);
canvas.addEventListener("click", jump);
function jump() {
  velocity = -10;
}

// Loop game
function draw() {
  // Background langit
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Burung
  ctx.drawImage(bird, bx, by, 20, 20);

  velocity += gravity;
  by += velocity;

  // Pipa
  for (let i = 0; i < pipes.length; i++) {
    let p = pipes[i];
    let pipeHeight = 200;

    // Pipa atas
    ctx.fillStyle = "green";
    ctx.fillRect(p.x, p.y, pipeWidth, pipeHeight);

    // Pipa bawah
    ctx.fillRect(p.x, pipeHeight + pipeGap, pipeWidth, canvas.height);

    p.x--;

    // Tambah pipa baru
    if (p.x === 150) {
      pipes.push({ x: canvas.width, y: Math.floor(Math.random() * -100) });
    }

    // Cek tabrakan
    if (
      bx + 40 >= p.x &&
      bx <= p.x + pipeWidth &&
      (by <= pipeHeight || by + 40 >= pipeHeight + pipeGap)
    ) {
      location.reload(); // Restart game
    }

    // Tambah skor
    if (p.x === bx) {
      score++;
    }
  }

  // Skor
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}

draw();
