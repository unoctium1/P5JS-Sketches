let points = [];
let count = 0;
let increment = 10;
let angleMode = false;

let drawNewPoint = true;

let debugMode = true;

let instructions = 'Hit \'r\' to reset the page.\n'+
  'Backspace undoes the last click.\n Middle mouse toggles where the curve should be drawn from.\n'+
  '\'d\' toggle drawing a new point or not.\n Drag the slider to adjust fidelity';

var incrementSlider;
var angleToggle;
var cnv;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  incrementSlider = createSlider(5, 50, increment, 1);
  incrementSlider.position(19,39);

  let inst = createP(instructions);
  inst.position(19,0);

  //angleToggle = createCheckbox("Lock Angles", angleMode);
  //angleToggle.position(19, 59);

  cnv.mouseClicked(canvasMouseClicked);
  cnv.mousePressed(canvasMousePressed);
}

function windowResized(){
  cnv = resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if(drawNewPoint){
    addPoint(true);
  }
  increment = incrementSlider.value();
  //angleMode = angleToggle.checked();
  for(let i = 0; i < points.length; i++){
    points[i].SetupPoints(increment)
  }
  for(let i = 0; i < points.length; i++){
    points[i].Draw();
  }
}

function addPoint(drawCurve){
  if(drawCurve){
    points[count] = createNode();
  }else if(count > 2){
    var prev = points[count-2];

    if(prev.Previous != null && prev.Previous.drawPoints === false){
      var newPrev = prev.Previous.Previous;
      points[count-3] = points[count-1];
      if(newPrev != null){
        newPrev.SetNextNode(points[count-3]);
      }
      removeLast();
      removeLast();
    }else{
      prev.SetDrawPoints(false);
    }
    points[count] = new Node(prev.p.x, prev.p.y);
  }
  if(count > 0){
    points[count-1].SetNextNode(points[count]);
  }
}

function removeLast(){
  var p = points.pop();
  p.BreakReference();
  count--;
}

function createNode(){
  if(angleMode && count > 2){
    var v = createVector(mouseX, mouseY);
    var angle = points[count-1].prevAngle;

    return new Node(p5.Vector.fromAngle(angle, v.mag()))
  }else{
    return new Node(mouseX, mouseY);
  }
}

function canvasMousePressed(event)
{
  if(event.button != 0){
    addPoint(false);
    count++;

    if(debugMode){
      debugPoints();
    }
  }
}

function canvasMouseClicked(event)
{
  
  if(event.button == 0){
    addPoint(true);
    count++;

    if(debugMode){
      debugPoints();
    }
  }
}

function keyPressed(){
  if(key === 'r'){
    points = [];
    count = 0;
  }else if(key === 'd'){
    if(drawNewPoint){
      removeLast();
    }
    drawNewPoint = !drawNewPoint;
    console.log(points.length);
  }else if(keyCode === BACKSPACE){
    removeLast();
    if(points.length > 2 && points[count-2].drawPoints == false){
      points[count-2].SetDrawPoints(true);
    }
  }

  if(debugMode){
    debugPoints();
  }
}

function debugPoints(){
  var s = points.length + " Points:\n";
  for(let i = 0; i < points.length; i++){
    var p = points[i];
    s += "" + p.p + " draw points: " + p.drawPoints + "\n";
  }
  console.log(s);
}
