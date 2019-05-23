class Bubble{  
  constructor(lc, uc, c, s){
    this.lowerCap = lc;
    this.upperCap = uc;
    this.col = c;
    this.speed = s;
    this.randomizeVals();
  }
  
  setNewVals(lc, uc, c, s){
    this.lowerCap = lc;
    this.upperCap = uc;
    this.col = c;
    this.speed = s;
  }
  
  static getColor(col){
    let r = red(col);
    let g = green(col);
    let b = blue(col);
    let rred = random(Math.max(0,r-15), Math.min(r+15,255));
    let rgreen = random(Math.max(0,g-15), Math.min(g+15,255));
    let rblue = random(Math.max(0,b-15), Math.min(b+15,255));
    return color(rred, rgreen, rblue);
  }
  
  
  randomizeVals(){
    this.radius = random(this.lowerCap, this.upperCap);
    this.x = random(0, width);
    this.y = random(0, height);
    
    this.randomColor = Bubble.getColor(this.col);
    
  }
  

  show(){
    noStroke();
    fill(this.randomColor);
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
    this.randomColor = Bubble.getColor(this.col);
  }
}
