class Skybox {

	constructor() {
		this.computed = null;
	}

	init(planeteSize) {

		const skyboxGeometry = new THREE.CubeGeometry(planeteSize*100, planeteSize*100, planeteSize*100);
		const skyboxAssetsMaterial = [
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("assets/sf-lightblue/right.png"), side: THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("assets/sf-lightblue/left.png"), side: THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("assets/sf-lightblue/top.png"), side: THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("assets/sf-lightblue/bot.png"), side: THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("assets/sf-lightblue/front.png"), side: THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("assets/sf-lightblue/back.png"), side: THREE.DoubleSide}),
		];
		// const skyboxMaterial = new THREE.MeshFaceMaterial(skyboxAssetsMaterial);

		this.computed = new THREE.Mesh(skyboxGeometry, skyboxAssetsMaterial);
	
	}

	draw() {
		scene.add(this.computed);
	}

	remove() {
		scene.remove(this.computed);
	}

} 