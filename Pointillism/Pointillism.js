var img;
var WIDTH;
var HEIGHT;

let loaded = false;


function setup() {
  // create canvas
  const c = createCanvas(710, 400);
  background(100);
  // Add an event for when a file is dropped onto the canvas
  c.drop(file => loadImage(file.data, img => handleImage(), img=> failImage()));


}

function draw() {
  if (!loaded) {
    fill(255);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text('Drag an image file onto the canvas.', width / 2, height / 2);
    noLoop();
  } else {

    if (mouseIsPressed) {
      for (var i = 0; i < 20; i++) {
        // floor because random gives decimal
        var x = floor(random(mouseX - (width / i), mouseX + (width / i)));
        var y = floor(random(mouseY - (height / i), mouseY + (height / i)));
        var pix = img.get(x, y);
        var newPix = getNewColor(pix, random(15, 90));
        fill(newPix, 128);
        var size = random(2, 10);
        ellipse(x, y, size, size);
      }
    }
    for (var j = 0; j < 6; j++) {
      // floor because random gives decimal
      var x1 = floor(random(0, width));
      var y1 = floor(random(0, height));
      var pix1 = img.get(x1, y1);
      var newPix1 = getNewColor(pix1, random(15, 90));
      fill(newPix1, 128);
      var size1 = random(2, 10);
      ellipse(x1, y1, size1, size1);
    }
  }
}

function keyPressed() {
  // 83 is key code for key "s"
  // http://keycode.info/
  if (keyCode == 83) {
    console.log("got here");
    save('myCanvas.jpg');
  }
}

function handleImage(){
  WIDTH = img.width;
    HEIGHT = img.height;
    resizeCanvas(WIDTH, HEIGHT);
    imageMode(CENTER);
    noStroke();
    background(255);
    // https://p5js.org/reference/#/p5/loadPixels
    img.loadPixels();
    loaded = true;
    loop();
}

function failImage(){
  fill(255);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text('Failed!', width / 2, height / 2 + 40);
}

function getNewColor(c, variance) {
  greenVal = green(c);
  redVal = red(c);
  blueVal = blue(c);
  randBlue = random(blueVal - variance, blueVal + variance);
  randGreen = random(greenVal - variance, greenVal + variance);
  randRed = random(redVal - variance, redVal + variance);
  return color(randRed, randBlue, randGreen);
}
