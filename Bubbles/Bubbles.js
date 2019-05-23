let bubbles = [];
let front = [];
let backCount = 400;
let frontCount = 50;

function setup() {
  createCanvas(800, 800);
  for (i = 0; i < backCount; i++){
    let background = color(random(0,255),random(225,255),random(225,255));
    bubbles[i] = new Bubble(5, 250, background, 0.3);
  }
  for (i = 0; i < frontCount; i++){
    let mouse = color(random(225,255),random(0,150),random(225,255));
    front[i] = new MouseBubble(5, 40, mouse, 1, 10, 10);
  }
}


function draw() {
  background(255);
  for (i = 0; i < bubbles.length; i++){
    bubbles[i].update();
    bubbles[i].show();
  }
  for (i = 0; i < front.length; i++){
    front[i].update();
    front[i].show();
  }
}
