class Node{
    constructor(x, y){
      if(typeof(x) === 'object'){
        this.p = x;
      }else{
        this.p = createVector(x, y);
      }
      this.drawPoints = true;
      this.Next = null;
      this.Previous = null;
      this.prevAngle = 0;
      this.nextAngle = 0;
    }

    SetDrawPoints(val){
        this.drawPoints = val;
    }
    
    SetNextNode(next){
      this.Next = next;
      next.Previous = this;
      this.SetupAngles();
    }

    SetupAngles(){
      if(this.Next != null){
        this.nextAngle = this.p.angleBetween(this.Next.p);
        this.Next.prevAngle = this.Next.p.angleBetween(this.p);
      }
    }
  
    SetupPoints(increment){
      if(this.Next != null){
        this.Points = this.PointsBetween(this.Next, increment);
      }
    }
    
    Draw(){
      fill(255);
      if(this.Next == null && this.Previous == null){
        ellipse(this.p.x, this.p.y, 10, 10);
      }
      if(this.Next != null){
        line(this.p.x, this.p.y, this.Next.p.x, this.Next.p.y);
        if(this.drawPoints){
            this.DrawPoints();
        }
      }
    }
  
    DrawPoints(){
      if(this.Next.Next != null){
        for(let i = 0; i < increment; i++){
          let p1 = this.Points[i];
          let p2 = this.Next.Points[i];
          line(p1.x, p1.y, p2.x, p2.y);
        }
      }
    }
  
    PointsBetween(second, increment){
      let valToAdd = 1 / increment;
      let t = 0;
      let ret = [];
      for(let i = 0; i < increment; i++){
        ret[i] = p5.Vector.lerp(this.p, second.p, t);
        t += valToAdd;
      }
      return ret;
      
    }
  }
