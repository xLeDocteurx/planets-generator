class Skybox {

	constructor(planeteSize = 500){
		this.planeteSize = planeteSize;
		this.computed = null;

		this.draw();
	}

	init(planeteSize = this.planeteSize){

		const skyboxGeometry = new THREE.CubeGeometry(this.planeteSize*100, this.planeteSize*100, this.planeteSize*100);
		const skyboxAssetsMaterial = [
			new THREE.MeshBasicMaterial({
				map: new THREE.TextureLoader().load("assets/sf-lightblue/right.png"), 
				transparent: true,
				opacity: 0.6,
				side: THREE.DoubleSide
			}),
			new THREE.MeshBasicMaterial({
				map: new THREE.TextureLoader().load("assets/sf-lightblue/left.png"), 
				transparent: true,
				opacity: 0.6,
				side: THREE.DoubleSide
			}),
			new THREE.MeshBasicMaterial({
				map: new THREE.TextureLoader().load("assets/sf-lightblue/top.png"), 
				transparent: true,
				opacity: 0.6,
				side: THREE.DoubleSide
			}),
			new THREE.MeshBasicMaterial({
				map: new THREE.TextureLoader().load("assets/sf-lightblue/bot.png"), 
				transparent: true,
				opacity: 0.6,
				side: THREE.DoubleSide
			}),
			new THREE.MeshBasicMaterial({
				map: new THREE.TextureLoader().load("assets/sf-lightblue/front.png"), 
				transparent: true,
				opacity: 0.6,
				side: THREE.DoubleSide
			}),
			new THREE.MeshBasicMaterial({
				map: new THREE.TextureLoader().load("assets/sf-lightblue/back.png"), 
				transparent: true,
				opacity: 0.6,
				side: THREE.DoubleSide
			}),
		];
		// const skyboxMaterial = new THREE.MeshFaceMaterial(skyboxAssetsMaterial);

		this.computed = new THREE.Mesh(skyboxGeometry, skyboxAssetsMaterial);
	
	}

	draw(){
		this.init();
		scene.add(this.computed);
	}

	update(){

	}

	remove(){
		scene.remove(this.computed);
	}

} 