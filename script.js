const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ukuran canvas
canvas.width = 320;
canvas.height = 480;

// Gambar burung
let bird = new Image();
bird.src = "rialo.png"; // 👉 ganti dengan gambar kamu

// Posisi burung
let bx = 50;
let by = 150;
let gravity = 0.5;
let velocity = 0;

// Pipa
let pipeWidth = 50;
let pipeGap = 120;
let pipes = [
  {
    x: canvas.width,
    y: 0,
    height: Math.floor(Math.random() * (canvas.height - pipeGap - 50))
  }
];

// Skor
let score = 0;

// Kontrol
document.addEventListener("keydown", jump);
canvas.addEventListener("click", jump);
function jump() {
  velocity = -7;
}

// Loop game
function draw() {
  // Background
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Burung
  ctx.drawImage(bird, bx, by, 40, 40);

  velocity += gravity;
  by += velocity;

  // Pipa
  for (let i = 0; i < pipes.length; i++) {
    let p = pipes[i];

    // Pipa atas
    ctx.fillStyle = "green";
    ctx.fillRect(p.x, p.y, pipeWidth, p.height);

    // Pipa bawah
    ctx.fillRect(p.x, p.height + pipeGap, pipeWidth, canvas.height);

    // Gerakan pipa ke kiri
    p.x--;

    // Tambah pipa baru
    if (p.x === 150) {
      pipes.push({
        x: canvas.width,
        y: 0,
        height: Math.floor(Math.random() * (canvas.height - pipeGap - 50))
      });
    }

    // Hapus pipa lama
    if (p.x + pipeWidth < 0) {
      pipes.shift();
    }

    // Cek tabrakan
    if (
      bx + 40 >= p.x &&
      bx <= p.x + pipeWidth &&
      (by <= p.height || by + 40 >= p.height + pipeGap)
    ) {
      alert("Game Over! Skor kamu: " + score);
      document.location.reload();
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
