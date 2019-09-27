// let canva;
let fr = 30;

let planete;
let water;
// let sphere = new Sphere(true);
let skybox;

let scene;
let camera;
let fov;

// let ambientLight;
// let directionnalLight;
let pointLight1;
let pointLight2;
let pointLight3;

let renderer;

let controls;
let options = {
	space: {
		ambientLight: 0.0,
		directionnalLight: 0.3,
		pointLights: 1.0,
	},
	planete: {
		size: 1,
		resolution: 16,
		showWater: true,
		// waterLevel: 0.56,
		abyssesLevel: 0.40,
		waterLevel: 0.50,
		groundLevel: 1,
		// waterLevel: 1,
	},
	noise_beta: {
		seed: "seed",
		// scale: 0.12,
		offset: 300,
		scale: 0.15,
		octave: 4,
		falloff: 0.5,
		// falloff: 1,
		strength: 0.25,
	},
	// stop: function() {
	//   this.velx = 0;
	//   this.vely = 0;
	// },
};
let gui;



preload();

setup();

// In case you need to preload ressources ( like the skybox texture, etc... )
function preload() {
  	// bg = loadImage('./assets/002.jpg');
  	// font = loadFont('assets/inconsolata.otf');
}
// Setting up the environement
function setup() {

	noiseSeed(options.noise_beta.seed);
	noiseDetail(options.noise_beta.octave,options.noise_beta.falloff);


  	setupUI();

	scene = new THREE.Scene();
	fov = 100;
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, fov );

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	camera.position.z = options.planete.size*3;

	// ambientLight = new THREE.AmbientLight(0xFFFFFF, options.space.ambientLight);
	// ambientLight.castShadow = true;            // default false
	// directionnalLight = new THREE.DirectionalLight( 0xffffff, options.space.directionnalLight, 100 );
	// directionnalLight.position.set( 1, 1, 1 ); 			//default; directionnalLight shining from top
	// directionnalLight.castShadow = true;            // default false
	pointLight1 = new THREE.PointLight( 0xffffff, options.space.pointLights, 0 );
	pointLight2 = new THREE.PointLight( 0xffffff, options.space.pointLights, 0 );
	pointLight3 = new THREE.PointLight( 0xffffff, options.space.pointLights, 0 );
	pointLight1.position.set(0, options.planete.size*4, 0);
	pointLight2.position.set(options.planete.size*2, options.planete.size*4, options.planete.size*2);
	pointLight3.position.set(-options.planete.size*2, -options.planete.size*4, -options.planete.size*2);
	// let pointLight = new THREE.PointLight(0x222222, 1.0);
	// let spotLight = new THREE.SpotLight(0x222222, 1.0);
	
	// scene.add(ambientLight);
	// scene.add(directionnalLight);
	scene.add(pointLight1);
	scene.add(pointLight2);
	scene.add(pointLight3);

	// Normal, Constant, Lambert, Phong, Blinn. materials type
	const groundMaterial = new THREE.MeshPhongMaterial({
		color: 0x8C3B0C, 
		// emissive: 0x8C3B0C, 
		side: THREE.DoubleSide, 
		flatShading: true
	});
	const waterMaterial = new THREE.MeshPhongMaterial({
		// opacity: 0.85,
      	// transparent: true,
		color: 0x156289, 
		emissive: 0x072534, 
		side: THREE.DoubleSide, 
		flatShading: true
	});
	// const toonMaterial = new THREE.MeshToonMaterial({
	// 	color: 0xffff00,
	// 	// wireframe: true,
	// 	// side: THREE.DoubleSide,
	// });

	skybox = new Skybox(options.planete.size);

	// planete = new ThreeCube(lineMaterial, waterMaterial);
	// planete = new ThreeCube();
	// planete = new ThreeCube2();

	planete = new Planete();
	planete.init(options.planete, options.noise_beta, waterMaterial, groundMaterial);
	planete.draw();

	// const waterGeometry = new THREE.SphereGeometry(options.planete.size/2, options.planete.resolution, options.planete.resolution);
	// water = new THREE.Mesh(waterGeometry, waterMaterial);
	// scene.add(water);

	window.addEventListener("resize", () => windowResized());

}

function setupUI() {

	gui = new dat.GUI();

	const spaceGui = gui.addFolder('Space');
	// spaceGui.add(options.space, 'ambientLight', 0, 2).name('ambientLight').onChange(() => {
	// 	ambientLight.intensity = options.space.ambientLight;
	// });
	// spaceGui.add(options.space, 'directionnalLight', 0, 2).name('directionnalLight').onChange(() => {
	// 	directionnalLight.intensity = options.space.directionnalLight;
	// });
	spaceGui.add(options.space, 'pointLights', 0, 2).name('pointLights').onChange(() => {
		pointLight1.intensity = options.space.pointLights;
		pointLight2.intensity = options.space.pointLights;
		pointLight3.intensity = options.space.pointLights;
	});
	spaceGui.open();

	const planetGui = gui.addFolder('Planete');
	// planetGui.add(options.planete, 'size', 1, 1000).name('Size').onChange(() => {
	// 	planete.redraw(options.planete, options.noise_beta);
 //    });
	planetGui.add(options.planete, 'resolution', 2, 64).name('Polygons resolution').onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	planetGui.add(options.planete, 'showWater', false, true).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	planetGui.add(options.planete, 'abyssesLevel', 0.0, 1.0).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	planetGui.add(options.planete, 'waterLevel', 0.0, 1.0).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	planetGui.add(options.planete, 'groundLevel', 0.0, 2.0).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	planetGui.open();

	const noiseBetaGui = gui.addFolder('Noise Beta');
	noiseBetaGui.add(options.noise_beta, 'seed').onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
		planete.draw();
	});
	noiseBetaGui.add(options.noise_beta, 'offset', 0, 1000).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	noiseBetaGui.add(options.noise_beta, 'scale', 0.01, 0.5).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	noiseBetaGui.add(options.noise_beta, 'octave', 1, 16).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
		planete.draw();
	});
	noiseBetaGui.add(options.noise_beta, 'falloff', 0.0, 1.0).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
		planete.draw();
	});
	noiseBetaGui.add(options.noise_beta, 'strength', 0.0, 2.0).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	noiseBetaGui.open();

	// gui.add(options, 'stop');

}

// Game's logic loop
const update = function(){
	// planete.rotation.x += 0.01;
	// planete.rotation.y += 0.01;
}

// Render's logic loop
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

function noiseDetailChanged() {
	noiseDetail(options.noise_beta.octave,options.noise_beta.falloff);
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