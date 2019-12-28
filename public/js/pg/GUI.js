

function setupUI(options) {

	let gui = new dat.GUI();
	
	const exportToAR = gui.addFolder('Export to AR');
	const exportButton = {
		QRcode: () => {
			if(document.getElementById("qrcode").style.display != "block"){
				const url = `https://${window.location.host}/ar/${returnSocketId()}`;
				console.log(url);
				new QRCode(document.getElementById("qrcode"), url);
				document.getElementById("qrcode").style.display = "block";
			} else {
				document.getElementById("qrcode").innerHTML = '';
				document.getElementById("qrcode").style.display = "none";
			}
		},
		roomID: () => { 
			logSocketId();
		},
	};
	// exportToAR.add(exportButton, 'get').name('Get');
	exportToAR.add(exportButton, 'QRcode').name('Get QRcode');
	exportToAR.add(exportButton, 'roomID').name('Get roomID');
	exportToAR.open();

	// const spaceGui = gui.addFolder('Space');
	// // spaceGui.add(options.space, 'ambientLight', 0, 2).name('ambientLight').step(0.01).onChange(() => {
	// // 	ambientLight.intensity = options.space.ambientLight;
	// // updateOptions(options);
	// // });
	// // spaceGui.add(options.space, 'directionnalLight', 0, 2).name('directionnalLight').step(0.01).onChange(() => {
	// // 	directionnalLight.intensity = options.space.directionnalLight;
	// // updateOptions(options);
	// // });
	// spaceGui.add(options.space, 'pointLights', 0, 2).name('pointLights').step(0.01).onChange(() => {
	// 	pointLight1.intensity = options.space.pointLights;
	// 	pointLight2.intensity = options.space.pointLights;
	// 	pointLight3.intensity = options.space.pointLights;
	// updateOptions(options);
	// });
	// spaceGui.open();

	const planetGui = gui.addFolder('Planete');
	// planetGui.add(options.planete, 'size', 1, 100).name('Size').onChange(() => {
	// 	planete.redraw(options.planete, options.noise_beta);
	// updateOptions(options);
 //    });
	planetGui.add(options.planete, 'resolution', 2, 128).step(1).name('Resolution').onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
		updateOptions(options);
	});
	planetGui.add(options.planete, 'showWater', false, true).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
		updateOptions(options);
	});
	// planetGui.add(options.planete, 'abyssesLevel', 0.0, 1.0).onChange(() => {
	// 	planete.redraw(options.planete, options.noise_beta);
	// updateOptions(options);
	// });
	planetGui.add(options.planete, 'waterLevel', 0.0, 1.0).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
		updateOptions(options);
	});
	planetGui.add(options.planete, 'groundLevel', 0.0, 2.0).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
		updateOptions(options);
	});
	planetGui.open();

	const noiseBetaGui = gui.addFolder('Noise Engine Beta');
	noiseBetaGui.add(options.noise_beta, 'seed').onChange(() => {
		noiseSeed(options.noise_beta.seed);
		planete.redraw(options.planete, options.noise_beta);
		updateOptions(options);
	});
	noiseBetaGui.add(options.noise_beta, 'offset', 0, 1000).step(1).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
		updateOptions(options);
	});
	// noiseBetaGui.add(options.noise_beta, 'scale', 0.01, 0.5).onChange(() => {
	noiseBetaGui.add(options.noise_beta, 'scale', 1.0, 5.0).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
		updateOptions(options);
	});
	noiseBetaGui.add(options.noise_beta, 'octave', 1, 16).step(1).onChange(() => {
		noiseDetail(options.noise_beta.octave,options.noise_beta.falloff);
		planete.redraw(options.planete, options.noise_beta);
		updateOptions(options);
	});
	noiseBetaGui.add(options.noise_beta, 'falloff', 0.0, 1.0).onChange(() => {
		noiseDetail(options.noise_beta.octave,options.noise_beta.falloff);
		planete.redraw(options.planete, options.noise_beta);
		updateOptions(options);
	});
	noiseBetaGui.add(options.noise_beta, 'strength', 0.0, 2.0).onChange(() => {
		planete.redraw(options.planete, options.noise_beta);
		updateOptions(options);
	});
	noiseBetaGui.open();

	// gui.add(options, 'stop');

}