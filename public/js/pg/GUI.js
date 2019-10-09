

function setupUI(options) {

	let gui = new dat.GUI();
	
	const exportToAR = gui.addFolder('Export to AR');
	const exportButton = {
		get: () => { console.log("get button clicked"); },
		post: () => { console.log("post button clicked"); },
		roomID: () => { 
			logSocketId();
		},
	};
	// exportToAR.add(exportButton, 'get').name('Get');
	// exportToAR.add(exportButton, 'post').name('Post');
	exportToAR.add(exportButton, 'roomID').name('roomID');
	// exportToAR.open();

	// const spaceGui = gui.addFolder('Space');
	// // spaceGui.add(options.space, 'ambientLight', 0, 2).name('ambientLight').step(0.01).onChange(() => {
	// // 	ambientLight.intensity = options.space.ambientLight;
	// // });
	// // spaceGui.add(options.space, 'directionnalLight', 0, 2).name('directionnalLight').step(0.01).onChange(() => {
	// // 	directionnalLight.intensity = options.space.directionnalLight;
	// // });
	// spaceGui.add(options.space, 'pointLights', 0, 2).name('pointLights').step(0.01).onChange(() => {
	// 	pointLight1.intensity = options.space.pointLights;
	// 	pointLight2.intensity = options.space.pointLights;
	// 	pointLight3.intensity = options.space.pointLights;
	// });
	// spaceGui.open();

	const planetGui = gui.addFolder('Planete');
	// planetGui.add(options.planete, 'size', 1, 100).name('Size').onChange(() => {
	// 	planete.redraw(options.planete, options.noise_beta);
 //    });
	planetGui.add(options.planete, 'resolution', 2, 128).step(1).name('Resolution').onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	planetGui.add(options.planete, 'showWater', false, true).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	// planetGui.add(options.planete, 'abyssesLevel', 0.0, 1.0).onChange(() => {
	// 	planete.redraw(options.planete, options.noise_beta);
	// });
	planetGui.add(options.planete, 'waterLevel', 0.0, 1.0).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	planetGui.add(options.planete, 'groundLevel', 0.0, 2.0).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	planetGui.open();

	const noiseBetaGui = gui.addFolder('Noise Engine Beta');
	noiseBetaGui.add(options.noise_beta, 'seed').onChange(() => {
		noiseSeed(options.noise_beta.seed);
		planete.redraw(options.planete, options.noise_beta);
	});
	noiseBetaGui.add(options.noise_beta, 'offset', 0, 1000).step(1).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	// noiseBetaGui.add(options.noise_beta, 'scale', 0.01, 0.5).onChange(() => {
	noiseBetaGui.add(options.noise_beta, 'scale', 0.01, 0.2).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	noiseBetaGui.add(options.noise_beta, 'octave', 1, 16).step(1).onChange(() => {
		noiseDetail(options.noise_beta.octave,options.noise_beta.falloff);
		planete.redraw(options.planete, options.noise_beta);
	});
	noiseBetaGui.add(options.noise_beta, 'falloff', 0.0, 1.0).onChange(() => {
		noiseDetail(options.noise_beta.octave,options.noise_beta.falloff);
		planete.redraw(options.planete, options.noise_beta);
	});
	noiseBetaGui.add(options.noise_beta, 'strength', 0.0, 2.0).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
	});
	noiseBetaGui.open();

	// gui.add(options, 'stop');

}