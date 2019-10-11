var container, stats, controls, clock, mixer;
var camera, scene, renderer, light;
var arToolkitContext;
var smoothedControls;
var clock = new THREE.Clock();
var onRenderFcts= [];
var SHADOW = false;

let planete;

let pointLight1;
let pointLight2;
let pointLight3;

// let options = {
//     space: {
//         ambientLight: 0.0,
//         // ambientLight: 1.0,
//         directionnalLight: 0.3,
//         // pointLights: 1.0,
//         pointLights: 0.005,
//     },
//     planete: {
//         size: 1,
//         resolution: 24,
//         // resolution: 8,
//         showWater: true,
//         // showWater: false,
//         // abyssesLevel: 0.40,
//         abyssesLevel: 0.33,
//         // waterLevel: 0.56,
//         waterLevel: 0.50,
//         groundLevel: 1,
//         // waterLevel: 1,
//     },
//     noise_beta: {
//         seed: "seed",
//         // scale: 0.12,
//         offset: 300,
//         scale: 0.15,
//         // scale: 0.015,
//         octave: 4,
//         // octave: 1,
//         falloff: 0.5,
//         // falloff: 1,
//         // strength: 0.25,
//         // strength: 1,
//         strength: 0.4,
//     },
// };

function initAR(){

    var arToolkitSource = new THREEx.ArToolkitSource({
        sourceType : 'webcam'
    })

    arToolkitSource.init(function onReady(){
        onResize()
    })

    window.addEventListener('resize', function(){
        onResize()
    })

    function onResize(){
        arToolkitSource.onResize()      
        arToolkitSource.copySizeTo(renderer.domElement) 
        if( arToolkitContext.arController !== null ){
            arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)    
        }       
    }

    // create atToolkitContext
    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: THREEx.ArToolkitContext.baseURL + 
            '../data/data/camera_para.dat',
        detectionMode: 'mono',
        maxDetectionRate: 30,
        canvasWidth: 80*3,
        canvasHeight: 60*3,
    })
    // initialize it
    arToolkitContext.init(function onCompleted(){
        // copy projection matrix to camera
        camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
    })

    // update artoolkit on every frame
    onRenderFcts.push(function(){
        if( arToolkitSource.ready === false )   return

        arToolkitContext.update( arToolkitSource.domElement )
    })

    var markerRoot = new THREE.Group
    scene.add(markerRoot)
    var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
        type : 'pattern',
        patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.hiro'
    })

    // build a smoothedControls
    var smoothedRoot = new THREE.Group()
    scene.add(smoothedRoot)
    smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot, {
        lerpPosition: 0.4,
        lerpQuaternion: 0.3,
        lerpScale: 1,
    })
    onRenderFcts.push(function(delta){
        smoothedControls.update(markerRoot)
    })

    var arWorldRoot = smoothedRoot;
    return arWorldRoot;
}

init();
function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();

    // camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, fov );
    camera = new THREE.PerspectiveCamera();

    scene.add(camera);

    // console.debug("camera", camera )
    // console.debug("scene", scene)

    root = initAR();

    //
    // ambientLight = new THREE.AmbientLight(0xFFFFFF, options.space.ambientLight);
    // ambientLight.castShadow = true;
    // directionnalLight = new THREE.DirectionalLight(0xffffff, options.space.directionnalLight, 100);
    // directionnalLight.position.set(options.planete.size*2, options.planete.size*2, options.planete.size*2);
    // directionnalLight.castShadow = true;
    pointLight1 = new THREE.PointLight( 0xffffff, options.space.pointLights, 0 );
    pointLight2 = new THREE.PointLight( 0xffffff, options.space.pointLights, 0 );
    pointLight3 = new THREE.PointLight( 0xffffff, options.space.pointLights, 0 );

    pointLight1.position.set(0, options.planete.size*4, 0);
    pointLight2.position.set(options.planete.size*2, options.planete.size*4, options.planete.size*2);
    pointLight3.position.set(-options.planete.size*2, -options.planete.size*4, -options.planete.size*2);
    // let spotLight = new THREE.SpotLight(0x222222, 1.0);
    
    //
    // scene.add(ambientLight);
    // scene.add(directionnalLight);
    
    if(SHADOW){
        light.castShadow = true;      
        light.shadow.mapSize.width = 512;  // default
        light.shadow.mapSize.height = 512; // default
        light.shadow.camera.near = 0.5;       // default
        light.shadow.camera.far = 500      // default
    }

    //
    // Normal, Constant, Lambert, Phong, Blinn, Toon. materials type
    const planeteMaterial = new THREE.MeshPhongMaterial({
        // wireframe:true,
        // opacity: 0.85,
        // transparent: true,
        // color: 0x156289, 
        vertexColors: THREE.VertexColors,
        // emissive: 0x072534, 
        side: THREE.DoubleSide,
        flatShading: true,
    });
    const waterMaterial = new THREE.MeshPhongMaterial({
        // wireframe:true,
        // opacity: 0.85,
        // transparent: true,
        color: 0x156289, 
        emissive: 0x072534, 
        side: THREE.DoubleSide,
        flatShading: true,
    });
    const groundMaterial = new THREE.MeshPhongMaterial({
        color: 0x8C3B0C, 
        // emissive: 0x8C3B0C, 
        side: THREE.DoubleSide,
        flatShading: true
    });
    const toonMaterial = new THREE.MeshToonMaterial({
        color: 0x8C3B0C,
        gradientMap: new THREE.TextureLoader().load("/assets/threeTone.jpg"),
        // wireframe: true,
        side: THREE.DoubleSide,
        flatShading: true
    });

    root.add(pointLight1);
    root.add(pointLight2);
    root.add(pointLight3);

    planete = new Planete();
    // planete.init(options.planete, options.noise_beta, waterMaterial, groundMaterial);
    planete.init(options.planete, options.noise_beta, planeteMaterial);
    // planete.init(options.planete, options.noise_beta, toonMaterial);
    planete.drawAR();

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaOutput = true;
    if(SHADOW){
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
    // stats = new Stats();

    // container.appendChild( stats.dom );
    
    animate();

}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var lastTimeMsec= null;
function animate(nowMsec) {
    requestAnimationFrame( animate );
    
    // planete.computed.rotation.x += 0.01;
    planete.computed.rotation.y += 0.01;

    renderer.render( scene, camera );
    // stats.update();

    lastTimeMsec        = lastTimeMsec || nowMsec-1000/60
    var deltaMsec       = Math.min(200, nowMsec - lastTimeMsec)
    lastTimeMsec        = nowMsec

    onRenderFcts.forEach(function(onRenderFct){
        onRenderFct(deltaMsec/1000, nowMsec/1000)
    })

    render()
}

function render() {
    // var delta = 0.75 * clock.getDelta();
    // mixer.update( delta );
    renderer.render( scene, camera );
}