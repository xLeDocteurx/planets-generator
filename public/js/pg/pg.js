// let canva;
let fr = 30;

let planete;
let water;
// let sphere = new Sphere(true);
let skybox;

let scene;
let camera;
let fov;

let ambientLight;
let directionnalLight;
let pointLight1;
let pointLight2;
let pointLight3;

let renderer;

let controls;
let options = {
	space: {
		ambientLight: 0.0,
		// ambientLight: 1.0,
		directionnalLight: 0.3,
		// pointLights: 1.0,
		pointLights: 0.005,
	},
	planete: {
		size: 1,
		resolution: 24,
		// resolution: 8,
		showWater: true,
		// showWater: false,
		// abyssesLevel: 0.40,
		abyssesLevel: 0.33,
		// waterLevel: 0.56,
		waterLevel: 0.50,
		groundLevel: 1,
		// waterLevel: 1,
	},
	noise_beta: {
		seed: "seed",
		// scale: 0.12,
		offset: 300,
		scale: 0.15,
		// scale: 0.015,
		octave: 4,
		// octave: 1,
		falloff: 0.5,
		// falloff: 1,
		// strength: 0.25,
		// strength: 1,
		strength: 0.4,
	},
};
// let gui;



preload();

setup();

// In case you need to preload ressources (like the skybox texture, etc...)
function preload() {
  	// bg = loadImage('./assets/002.jpg');
  	// font = loadFont('assets/inconsolata.otf');
}
// Setting up the environement
function setup() {
	//
	noiseSeed(options.noise_beta.seed);
	noiseDetail(options.noise_beta.octave,options.noise_beta.falloff);
	//
  	setupUI(options);

  	//
	scene = new THREE.Scene();
	fov = 100;
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, fov);
	camera.position.z = options.planete.size*3;

	//
	renderer = new THREE.WebGLRenderer({
        antialias: true,
        // alpha: true,
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	// renderer.setClearColor(0x000000, 1);
	document.body.appendChild(renderer.domElement);

	//
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	//
	ambientLight = new THREE.AmbientLight(0xffffff, options.space.ambientLight);
	ambientLight.castShadow = true;
	directionnalLight = new THREE.DirectionalLight(0xffffff, options.space.directionnalLight, 100);
	directionnalLight.position.set(options.planete.size*2, options.planete.size*2, options.planete.size*2);
	directionnalLight.castShadow = true;
	pointLight1 = new THREE.PointLight(0xffffff, options.space.pointLights, 0);
	pointLight2 = new THREE.PointLight(0xffffff, options.space.pointLights, 0);
	pointLight3 = new THREE.PointLight(0xffffff, options.space.pointLights, 0);
	pointLight1.position.set(0, options.planete.size*4, 0);
	pointLight2.position.set(options.planete.size*2, options.planete.size*4, options.planete.size*2);
	pointLight3.position.set(-options.planete.size*2, -options.planete.size*4, -options.planete.size*2);
	// let spotLight = new THREE.SpotLight(0x222222, 1.0);
	
	//
	// scene.add(ambientLight);
	// scene.add(directionnalLight);
	scene.add(pointLight1);
	scene.add(pointLight2);
	scene.add(pointLight3);

	//
	// Normal, Standard, Lambert, Phong, Toon. materials type
	const planeteMaterial = new THREE.MeshPhongMaterial({
		// wireframe:true,
		// opacity: 0.85,
      	// transparent: true,
		// color: 0x8C3B0C,
		// gradientMap: new THREE.TextureLoader().load("assets/sf-lightblue/threeTone.png"),
		vertexColors: THREE.VertexColors,
		// emissive: 0x072534,
		side: THREE.DoubleSide,
		flatShading: true,
	});

	skybox = new Skybox(options.planete.size);

	planete = new Planete();
	planete.init(options.planete, options.noise_beta, planeteMaterial);
	planete.draw();

	window.addEventListener("resize", () => windowResized());

}

// Game's logic loop
const update = function(){
	// planete.computed.rotation.x += 0.0025;
	// planete.computed.rotation.y += 0.0025;
    // planete.computed.rotation.x += 0.01;
    // planete.computed.rotation.y += 0.01;
}

// Render's logic loop
const render = function(){
	renderer.render(scene, camera);
}

const gameLoop = function(){
	requestAnimationFrame(gameLoop);

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