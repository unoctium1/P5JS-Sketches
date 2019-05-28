let pix = 15;
let decrease = false;

let isStaticNoise = false;

let isPaused = false;

const RectType = {"normal":1, "boxxy":2, "noisy":3, "shaky":4, "random":5};

let r = RectType.normal;

function setup(){
  createCanvas(windowWidth, windowHeight);
  reset();
  counter = 0;
}

function keyPressed() {
  if (key == ' ') {
    isStaticNoise = !isStaticNoise;
  }
  if(key == 'p'){
    if(isPaused){
       loop();
    }else{
      noLoop();
    }
    isPaused = !isPaused;
  }
  if(key == 'b'){ r = RectType.boxxy;}
  if(key == 'n'){r = RectType.normal;}
  if(key == 'm'){ r = RectType.noisy;}
  if(key == 'v'){ r = RectType.shaky;}
  if(key == 'c'){ r = RectType.random;}
}

function reset(){
  counter = 0;
  refreshRate = Math.floor(random(2,25));
  lowerBound = Math.floor(random(0,100));
  higherBound = Math.floor(random(100,10000));
}

function draw(){
  if(!isStaticNoise){
    counter +=1 ;
    if(counter >= refreshRate){ reset();}
  }
  handleMouse();
  background(255);
  noStroke();
  for(i =0; i < width; i+=pix){
    for(j =0; j < height; j+=pix){
      fill(randomColor());
      chooseRect(i, j);
    }
  }
}

function chooseRect(x, y){
  switch(r){
        case 1:
          rect(x, y, pix, pix);
          break;
        case 2:
          boxxyyyyyyy(x, y);
          break;
        case 3:
          noisyRect(x, y);
          break;
        case 4:
          shakyRect(x, y);
          break;
        case 5:
          randomRect(x, y);
          break;
      }
}

function noisyRect(x, y){
  rect(x, y, random(1, width-x), random(1, height-y));
}

function randomRect(x, y){
  if(noise(x, y) > 0.4){
    noisyRect(x,y);
  }
}

function boxxyyyyyyy(x, y){
  rect(x, y, random(1, pix+15), random(1, pix+15));
}

function shakyRect(x, y){
  rect(x, y, random(pix-5, pix+15), random(pix-5, pix+15));
}

function handleMouse(){
  if(pix >= 100){ decrease = true;}
  if(pix <= 7){ decrease = false;}
  
  if(mouseIsPressed){
    if(!decrease){
      pix++;
    }else{
      pix--;
    }
  }
}

function randomColor(){
  if(!isStaticNoise){
    randomSeed(random(lowerBound,higherBound)); //this is pretty fun
  }
  return color(random(0,255), random(0,255), random(0,255));
}
