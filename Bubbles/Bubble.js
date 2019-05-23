class Bubble{  
  constructor(lc, uc, c, s){
    this.lowerCap = lc;
    this.upperCap = uc;
    this.col = c;
    this.speed = s;
    this.randomizeVals();
  }
  
  
  randomizeVals(){
    this.radius = random(this.lowerCap, this.upperCap);
    this.x = random(0, width);
    this.y = random(0, height);
  }
  
  show(){
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
  
  update(){
    if(this.radius > 0){
      this.radius -= this.speed;
    }else{
      this.randomizeVals();
    }
  }
}

class MouseBubble extends Bubble{
  constructor(lc, uc, c, s, w, h){
    super(lc, uc, c, s);
    this.w = w;
    this.h = h;
    this.randomizeVals();
  }
  
  randomizeVals(){
    this.radius = random(this.lowerCap, this.upperCap);
    this.x = random(mouseX-this.w, mouseX+this.w);
    this.y = random(mouseY-this.h, mouseY+this.h);
  }
}
