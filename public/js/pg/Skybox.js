class Skybox {

	constructor() {
		this.computed = null;
	}

	init(planeteSize) {

		const skyboxGeometry = new THREE.CubeGeometry(planeteSize*5, planeteSize*5, planeteSize*5);
		const skyboxAssetsMaterial = [
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("assets/milkyway/NegativeZ.png"), side: THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("assets/milkyway/PositiveZ.png"), side: THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("assets/milkyway/NegativeY.png"), side: THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("assets/milkyway/PositiveY.png"), side: THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("assets/milkyway/NegativeX.png"), side: THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("assets/milkyway/PositiveX.png"), side: THREE.DoubleSide}),
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