// let bg;
// let font;

// let canva;
let fr = 30;

// let rotateYSlider;
// let rotateYState = true;
// let sizeSlider;
let size;
// let resolutionSlider;
let resolution;
let planete;
// let sphere = new Sphere(true);

var scene;
var camera;

var renderer;

let controls;



preload();

setup();

// animate();

// let loop = setInterval(draw(), 1000/fr);
// // Stop the loop
// clearInterval(refreshIntervalId);

function preload() {

	size = 300;
	resolution = 4;
	planete = new ThreeCube();
  	// bg = loadImage('./assets/002.jpg');
  	// font = loadFont('assets/inconsolata.otf');

}

function setup() {

  	setupUI();

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	// scene.add( new THREE.AmbientLight( 0x222222 ) );
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	camera.position.z = 500;

	planete.init(size, resolution);

	planete.draw();
	
	window.addEventListener("resize", () => windowResized());

}

function setupUI() {

	// sizeSlider = createSlider(100, 1000, 300);
	// sizeSlider.position(10, 40);
	// size = sizeSlider.value();
	// size = 300;
	// resolutionSlider = createSlider(2, 25, 4);
	// resolutionSlider.position(10, 10);
	// resolution = resolutionSlider.value();
	// resolution = 4;

}

const update = function(){

}

const render = function(){

	renderer.render( scene, camera );

}

const gameLoop = function(){

	requestAnimationFrame( gameLoop );

	update();
	render();

}
gameLoop();

// function settingsEdited() {

// 	size = sizeSlider.value();
// 	resolution = resolutionSlider.value();
// 	planete.init(size, resolution);
//  	planete.draw();

// }

function windowResized() {

  	const width = window.innerWidth;
  	const height = window.innerHeight;
  	renderer.setSize(width,height);
  	camera.aspect = width/height;
  	camera.updateProjectionMatrix();

}

// function gotFile(file) {
//   // If it's an image file
//   if (file.type === 'image') {
//     // Create an image DOM element but don't show it
//     const img = createImg(file.data).hide();
//     // Draw the image onto the canvas
//     image(img, 0, 0, width, height);
//   } else {
//     console.log('Not an image file!');
//   }
// }

// function getCrop() {

// 	windowRatio = windowWidth/windowHeight;
// 	imageRatio = bg.width/bg.height;

// 	if(windowWidth > windowHeight) {
// 		return bg.get(0, bg.height/2 - bg.height/windowRatio/2, bg.width, bg.height/windowRatio);
// 	} else {
// 		return bg.get(bg.width/2 - bg.width*windowRatio/2, 0, bg.width * windowRatio, bg.height);
// 	}

// }