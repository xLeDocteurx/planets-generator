// Coding challenges 9.2, 18.1, 18.2, 18.8

/*let input = document.getElementById('file_input');
*/
let bg;
let font;
//let  ;
let canva;
let fr = 30;

let rotateYSlider;
let rotateYState = true;
let sizeSlider;
let size;
let resolutionSlider;
let resolution;

let cube = new Cube();
let sphere = new Sphere(true);

function preload() {
  
  	// bg = loadImage('./assets/002.jpg');
  	font = loadFont('assets/inconsolata.otf');

}

function setup() {

  	canva = createCanvas(windowWidth, windowHeight, WEBGL);
  	canva.parent('canvas_container'); 
  	// frameRate(fr);
	
  	// background(0);
	// Add an event for when a file is dropped onto the canvas
  	canva.drop(gotFile);

	textFont(font);
	textSize(15);
	// textAlign(LEFT, TOP);

	sizeSlider = createSlider(100, 1000, 300);
	sizeSlider.position(10, 40);
	size = sizeSlider.value();

	resolutionSlider = createSlider(2, 50, 4);
	resolutionSlider.position(10, 10);
	resolution = resolutionSlider.value();

	cube.init(size, resolution);

  	// noLoop();

}

function draw() {

	// background(getCrop());
  	// background(0);
  	background(255);

	fill(0);		
    strokeWeight(2);
  	// noStroke();
  	text("size : "+size, -windowWidth/4, -windowHeight/4);
  	text("res : "+resolution, -windowWidth/4 - 100, -windowHeight/4);

  	// noLoop();
  	orbitControl();
  	// if(rotateYState)
  	// rotateY(frameCount * 0.01);
	// translate(-100,-50,0);
	cubeEdited();
  	cube.draw();
  	// sphere.draw(size, resolution);


    // noLoop();

}

function cubeEdited() {

	size = sizeSlider.value();
	resolution = resolutionSlider.value();
	cube.init(size, resolution);

}

function windowResized() {

  	resizeCanvas(windowWidth, windowHeight);
  	// background(getCrop());

}

function gotFile(file) {
  // If it's an image file
  if (file.type === 'image') {
    // Create an image DOM element but don't show it
    const img = createImg(file.data).hide();
    // Draw the image onto the canvas
    image(img, 0, 0, width, height);
  } else {
    console.log('Not an image file!');
  }
}

function getCrop() {

	windowRatio = windowWidth/windowHeight;
	imageRatio = bg.width/bg.height;

	if(windowWidth > windowHeight) {
		return bg.get(0, bg.height/2 - bg.height/windowRatio/2, bg.width, bg.height/windowRatio);
	} else {
		return bg.get(bg.width/2 - bg.width*windowRatio/2, 0, bg.width * windowRatio, bg.height);
	}

}