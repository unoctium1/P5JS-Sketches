let pix = 10;
let decrease = false;

let isStaticNoise = false;

let isPaused = false;
let path = window.location.pathname;

let ts = 140;

const RectType = {"normal":1, "boxxy":2, "noisy":3, "shaky":4, "random":5};

let r = RectType.normal;

function preload() {
  myFont = loadFont("BBrick.otf");
}

function setup(){
  const c = createCanvas(windowWidth, 400000/windowWidth);
  c.parent('main_content_wrap');
  back = createGraphics(width, height);
  back.noStroke();
  reset();
  counter = 0;
  todisplay = path.replace("/P5JS-Sketches/", "");
  foreground = createTextMask(todisplay, width, height).get();
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
  /*
  if(keyCode == UP_ARROW){
    ts ++;
    foreground = createTextMask(string, width, height).get();
  }
  if(keyCode == DOWN_ARROW){
    ts --;
    foreground = createTextMask(string, width, height).get();
  }
  */
  if(key == 'b'){ r = RectType.boxxy;}
  if(key == 'n'){ r = RectType.normal;}
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
  clear();
  if(!isStaticNoise){
    counter +=1 ;
    if(counter >= refreshRate){ reset();}
  }
  handleMouse();
  back.background(255);
  for(i =0; i < back.width; i+=pix){
    for(j =0; j < back.height; j+=pix){
      back.fill(randomColor());
      chooseRect(i, j);
    }
  }
  (img = back.get()).mask(foreground);
  image(img,0,0);
}

function chooseRect(x, y){
  switch(r){
        case 1:
          back.rect(x, y, pix, pix);
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
  back.rect(x, y, random(1, width-x), random(1, height-y));
}

function randomRect(x, y){
  if(noise(x, y) > 0.4){
    noisyRect(x,y);
  }
}

function boxxyyyyyyy(x, y){
  back.rect(x, y, random(1, pix+15), random(1, pix+15));
}

function shakyRect(x, y){
  back.rect(x, y, random(pix-5, pix+15), random(pix-5, pix+15));
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

function createTextMask(str, w, h){
  let mask = createGraphics(w, h);
  mask.textAlign(CENTER, CENTER);
  mask.textSize(ts);
  mask.textLeading(ts - 40);
  mask.textFont(myFont);
  mask.text("Error 404", 30, 0, w, h/2);
  mask.text(str, 30, h/2, w, h/2);
  return mask;
}
