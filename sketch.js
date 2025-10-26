let blooms = [];
const BLOOMS_PER_CLICK = 5;
const JITTER = 18;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  textFont("Helvetica");
}

function draw() {
  background(0, 0, 0); // negro
  drawHeader(); // texto blanco centrado

  for (const b of blooms) {
    // ease-out hacia el tamaño final
    b.r = abs(b.rTarget - b.r) < 0.3 ? b.rTarget : lerp(b.r, b.rTarget, 0.15);

    noStroke();
    // glow en capas
    for (let k = 14; k >= 0; k--) {
      const rr = b.r + k * 6;
      const a = map(k, 14, 0, 0.05, 0.22);
      fill(b.hue, 70, 95, a);
      circle(b.x, b.y, rr * 2);
    }
    // núcleo
    fill(b.hue, 80, 95, 0.9);
    circle(b.x, b.y, b.r * 2);

    // etiqueta °F (blanca)
    fill(0, 0, 100, 0.95);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(constrain(b.r * 0.33, 10, 26));
    text(b.tempF + "°F", b.x, b.y);
  }
}

function mousePressed() {
  addCluster(mouseX, mouseY);
}
function mouseDragged() {
  addCluster(mouseX, mouseY);
}

function addCluster(x, y) {
  for (let i = 0; i < BLOOMS_PER_CLICK; i++) {
    const tempC = random(10, 30);
    const tempF = Math.round((tempC * 9) / 5 + 32);
    const hue = map(tempC, 10, 30, 200, 0);
    const rT = map(tempC, 10, 30, 24, 140);

    blooms.push({
      x: x + random(-JITTER, JITTER),
      y: y + random(-JITTER, JITTER),
      r: 6,
      rTarget: rT,
      hue,
      tempF,
    });
  }
}

function keyPressed() {
  if (key === "C" || key === "c") blooms = [];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Header centrado blanco: "Weather in Hayward" + "click the screen, C to restart"
function drawHeader() {
  const A = "Weather",
    B = " in ",
    C = "Hayward",
    SUB = "click the screen, C to restart";
  const fs = constrain(width * 0.08, 28, 90);
  const subFs = max(14, fs * 0.33);
  const yMain = fs + 20;

  textAlign(LEFT, BASELINE);
  fill(0, 0, 100); // blanco

  textSize(fs);
  textStyle(BOLD);
  const wA = textWidth(A);
  textStyle(NORMAL);
  const wB = textWidth(B);
  textStyle(ITALIC);
  const wC = textWidth(C);
  const startX = width / 2 - (wA + wB + wC) / 2;

  textSize(fs);
  textStyle(BOLD);
  text(A, startX, yMain);
  textStyle(NORMAL);
  text(B, startX + wA, yMain);
  textStyle(ITALIC);
  text(C, startX + wA + wB, yMain);

  textStyle(NORMAL);
  textAlign(CENTER, BASELINE);
  textSize(subFs);
  text(SUB, width / 2, yMain + subFs + 8);
}
