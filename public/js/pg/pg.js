/*let input = document.getElementById('file_input');
*/
let bg;
let c;
//let  ;
let canva;
let fr = 30;

function preload() {
  
}

function setup() {
  bg = loadImage('./assets/002.jpg');
  canva = createCanvas(windowWidth/2, windowHeight/2);
  canva.parent('canvas_container'); 
  frameRate(fr);

  c = bg.get(img.width / 2, img.height / 2)
  background(c);
  // background(bg);

  // noLoop();
}

function draw() {
  

}

function windowResized() {
  resizeCanvas(windowWidth/2, windowHeight/2);
}