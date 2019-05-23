let bubbles = [];
let front = [];
let backCount = 400;
let frontCount = 50;

let lc = 5;
let mouselc = 5;
let uc = 250;
let mouseuc = 40;
let speed = 0.3;
let mousespeed = 1;

var panel;

let isOptionsOn = true;

var backColor, frontColor;
var bcPicker, fcPicker;

var fsSlider, bsSlider, fuSlider, buSlider, flSlider, blslider;
var numBackgroundBubbles, numFrontBubbles;

function setup() {
  createCanvas(800, 800);
  
  backColor = color(125, 240, 240);
  frontColor = color(240, 75, 240);
  
  createDiv('options').hide();
  let button = createButton("Options");
  button.position(19,19);
  button.mousePressed(toggleOptions);
  
  let button1 = createButton("Reset");
  button1.addClass('options');
  button1.position(100,19);
  button1.mousePressed(setupBubbles);
  
  createSliders();
  panel = selectAll('.options');
  toggleOptions();
  setupBubbles();
}

function toggleOptions(){
  for(i = 0; i < panel.length; i++){
    if(isOptionsOn){
     panel[i].hide(); 
    }else{
      panel[i].show(); 
    }
  }
  isOptionsOn = !isOptionsOn;
}

function createSliders(){
  bcPicker = createColorPicker(backColor);
  bcPicker.addClass('options');
  fcPicker = createColorPicker(frontColor);
  fcPicker.addClass('options');
  bcPicker.position(19, 280);
  fcPicker.position(100, 280);
  
  numBackgroundBubbles = createSlider(0, 500, backCount, 1);
  numBackgroundBubbles.addClass('options');
  numBackgroundBubbles.position(19,40);
  numFrontBubbles = createSlider(0, 500, frontCount, 1);
  numFrontBubbles.addClass('options');
  numFrontBubbles.position(19,70);
  
  fsSlider = createSlider(0, 1, mousespeed, 0.1);
  fsSlider.position(19, 100);
  fsSlider.addClass('options');
  bsSlider = createSlider(0, 1, speed, 0.1);
  bsSlider.position(19, 130);
  bsSlider.addClass('options');
  fuSlider = createSlider(0, 400, mouseuc, 1);
  fuSlider.position(19, 160);
  fuSlider.addClass('options');
  buSlider = createSlider(0, 400, uc, 1);
  buSlider.position(19, 190);
  buSlider.addClass('options');
  flSlider = createSlider(0, 100, mouselc, 1);
  flSlider.position(19, 220);
  flSlider.addClass('options');
  blSlider = createSlider(0, 100, lc, 1);
  blSlider.position(19, 250);
  blSlider.addClass('options');
  
}

function writeLabels(){
  fill(50, 80);
  rect(10,10,300,305);
  fill(255);
  text('Background bubbles', numBackgroundBubbles.x * 2 + numBackgroundBubbles.width, numBackgroundBubbles.y+12);
  text('Foreground bubbles', numFrontBubbles.x * 2 + numFrontBubbles.width, numFrontBubbles.y+12);
  text('Background Speed', bsSlider.x * 2 + bsSlider.width, bsSlider.y+12);
  text('Foreground Speed', fsSlider.x * 2 + fsSlider.width, fsSlider.y+12);
  text('Background Min Radius', blSlider.x * 2 + blSlider.width, blSlider.y+12);
  text('Background Max Radius', buSlider.x * 2 + buSlider.width, buSlider.y+12);
  text('Foreground Min Radius', flSlider.x * 2 + flSlider.width, flSlider.y+12);
  text('Foreground Max Radius', fuSlider.x * 2 + fuSlider.width, fuSlider.y+12);

}

function setupBubbles(){
  bubbles = [];
  front = [];
  frontCount = numFrontBubbles.value();
  backCount = numBackgroundBubbles.value();
  for (i = 0; i < backCount; i++){
    bubbles[i] = new Bubble(lc, uc, backColor, speed);
  }
  for (i = 0; i < frontCount; i++){
    front[i] = new MouseBubble(mouselc, mouseuc, frontColor, 1, 10, mousespeed);
  }
}

function draw() {
  
  speed = bsSlider.value();
  mousespeed = fsSlider.value();
  uc = buSlider.value();
  lc = blSlider.value();
  mouseuc = fuSlider.value();
  mouselc = flSlider.value();
  backColor = bcPicker.value();
  frontColor = fcPicker.value();
  
  background(255);
  for (i = 0; i < bubbles.length; i++){
    bubbles[i].setNewVals(lc, uc, backColor, speed);
    bubbles[i].update();
    bubbles[i].show();
  }
  for (i = 0; i < front.length; i++){
    front[i].setNewVals(mouselc, mouseuc, frontColor, mousespeed);
    front[i].update();
    front[i].show();
  }
  if(isOptionsOn){
    writeLabels();
  }
}
