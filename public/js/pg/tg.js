// let bg;
// let font;

// let canva;
let fr = 30;

// let rotateYSlider;
// let rotateYState = true;
// let sizeSlider;
// let size;
// let resolutionSlider;
// let resolution;
let planete;
let water;
// let sphere = new Sphere(true);
let skybox;

let scene;
let camera;
let fov;

let renderer;

let controls;
let options = {
	planete: {
		size: 300,
		resolution: 16,
	},
	noise_beta: {
		seed: "seed",
		threeshold: 0.56,
		octave: 1,
		stregth: 1,
	},
	// stop: function() {
	//   this.velx = 0;
	//   this.vely = 0;
	// },
};
let gui;



preload();

setup();

// DAT.GUI Related Stuff



// animate();

// let loop = setInterval(draw(), 1000/fr);
// // Stop the loop
// clearInterval(refreshIntervalId);

function preload() {

  	// bg = loadImage('./assets/002.jpg');
  	// font = loadFont('assets/inconsolata.otf');
}

function setup() {

	noiseSeed(options.noise_beta.seed);

  	setupUI();

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, fov );

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	camera.position.z = options.planete.size*3;

	const ambiantLight = new THREE.AmbientLight(0xFFFFFF, 1.0);
	//Create a DirectionalLight and turn on shadows for the light
	var directionnalLight = new THREE.DirectionalLight( 0xffffff, 1, 100 );
	directionnalLight.position.set( 0, 1, 0 ); 			//default; directionnalLight shining from top
	directionnalLight.castShadow = true;            // default false
	let pointLight1 = new THREE.PointLight( 0xffffff, 1, 0 );
	let pointLight2 = new THREE.PointLight( 0xffffff, 1, 0 );
	let pointLight3 = new THREE.PointLight( 0xffffff, 1, 0 );
	pointLight1.position.set(0, options.planete.size*8, 0);
	pointLight2.position.set(options.planete.size*4, options.planete.size*8, options.planete.size*4);
	pointLight3.position.set(-options.planete.size*4, -options.planete.size*8, -options.planete.size*4);
	const pointLight = new THREE.PointLight(0x222222, 1.0);
	const spotLight = new THREE.SpotLight(0x222222, 1.0);
	
	// scene.add(ambiantLight);
	// scene.add(directionnalLight);
	scene.add(pointLight1);
	scene.add(pointLight2);
	scene.add(pointLight3);

	// Normal, Constant, Lambert, Phong, Blinn. materials type
	// const material = new THREE.MeshLambertMaterial({			
	var lineMaterial = new THREE.LineBasicMaterial({
		color: 0xffffff, 
		transparent: true, 
		opacity: 0.5
	});
	var groundMaterial = new THREE.MeshPhongMaterial({
		color: 0x8C3B0C, 
		// emissive: 0x8C3B0C, 
		side: THREE.DoubleSide, 
		flatShading: true
	});
	var waterMaterial = new THREE.MeshPhongMaterial({
		opacity: 0.85,
      	transparent: true,
		color: 0x156289, 
		emissive: 0x072534, 
		side: THREE.DoubleSide, 
		flatShading: true
	});

	const material = new THREE.MeshLambertMaterial({
		color: 0x156289,
		// wireframe: true,
		side: THREE.DoubleSide,
	});
	const toonMaterial = new THREE.MeshToonMaterial({
		color: 0xffff00,
		// wireframe: true,
		// side: THREE.DoubleSide,
	});

	// skybox = new Skybox();
	// skybox.init(options.planete.size);
	// skybox.draw();

	// planete = new ThreeCube(lineMaterial, groundMaterial);
	planete = new ThreeCube(groundMaterial);
	planete.init(options.planete, options.noise_beta);
	planete.draw();
	// const waterGeometry = new THREE.SphereGeometry(options.planete.size/2, options.planete.resolution, options.planete.resolution);
	// water = new THREE.Mesh(waterGeometry, waterMaterial);
	// scene.add(water);

	fov = options.planete.size*10;

	window.addEventListener("resize", () => windowResized());

}

function setupUI() {

	gui = new dat.GUI();

	var planetGui = gui.addFolder('Planete');
	planetGui.add(options.planete, 'size', 1, 500).name('Size').onChange(() => {
		planete.remove();
		planete.init(options.planete, options.noise_beta);
		planete.draw();
    });
	planetGui.add(options.planete, 'resolution', 2, 64).name('Resolution').onChange(() => {
		planete.remove();
		planete.init(options.planete, options.noise_beta);
		planete.draw();
	});
	planetGui.open();

	var noiseBetaGui = gui.addFolder('Noise Beta');
	noiseBetaGui.add(options.noise_beta, 'seed').onChange(() => {
		seedChanged();
		planete.remove();
		planete.init(options.planete, options.noise_beta);
		planete.draw();
	});
	noiseBetaGui.add(options.noise_beta, 'threeshold', 0, 1).onChange(() => {
		planete.remove();
		planete.init(options.planete, options.noise_beta);
		planete.draw();
	});
	noiseBetaGui.add(options.noise_beta, 'octave', 0, 100).onChange(() => {
		planete.remove();
		planete.init(options.planete, options.noise_beta);
		planete.draw();
	});
	noiseBetaGui.add(options.noise_beta, 'stregth', 0, 100).onChange(() => {
		planete.remove();
		planete.init(options.planete, options.noise_beta);
		planete.draw();
	});
	noiseBetaGui.open();

	// gui.add(options, 'stop');

}

const update = function(){

	// planete.rotation.x += 0.01;
	// planete.rotation.y += 0.01;

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

function windowResized() {

  	const width = window.innerWidth;
  	const height = window.innerHeight;
  	renderer.setSize(width,height);
  	camera.aspect = width/height;
  	camera.updateProjectionMatrix();

}

function seedChanged() {
	noiseSeed(options.noise_beta.seed);
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