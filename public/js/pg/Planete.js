class Planete {

	constructor(){
		// Passed properties
		this.planeteOptions = null;
		this.noiseOptions = null;

		this.firstMaterial = null;
		this.secondMaterial = null;

		// Computed properties
		this.farestVertex = null;
		this.sliceSize = null;

		this.faces = [];
		this.computed = null;
	}

	init(planeteOptions, noiseOptions, firstMaterial = this.firstMaterial, secondMaterial = this.secondMaterial){
		//
		this.planeteOptions = planeteOptions;
		this.noiseOptions = noiseOptions;
		//
		this.firstMaterial = firstMaterial;
		this.secondMaterial = secondMaterial;
		//
		const {size, resolution} = planeteOptions;
		//
		// 	this.farestVertex = Math.sqrt(Math.pow(Math.sqrt(Math.pow(size,2)+Math.pow(size,2))/2,2)+Math.pow(size/2,2));
		const v1 = new THREE.Vector3(0,0,0);
		const v2 = new THREE.Vector3(size/2,size/2,size/2);
		this.farestVertex = v1.distanceTo(v2);
		//
		this.sliceSize = size/(resolution-1);
		//
		this.computed = new THREE.Group();
		for (let i=0; i<6; i++) {
			this.initAFace(i);
		}
	}

	draw(){
		scene.add(this.computed);
	}

	drawAR(){
    	// this.computed.position.z = -this.planeteOptions.planete.size*2;
		root.add(this.computed);
	}

	remove(){
		scene.remove(this.computed);
	}

	//
	redraw(planeteOptions, noiseOptions){
		this.remove();
		this.init(planeteOptions, noiseOptions);
		this.draw();
	}

	computeVertex(x,y,z){
		//
		let newVertex = {x:x,y:y,z:z};
		//
		newVertex = this.normaliseVertex(newVertex);
		//
		newVertex = this.applyNoiseToVertex(newVertex);

		return [newVertex.x, newVertex.y, newVertex.z];
	}

	normaliseVertex(vertex){
		//
		const h1 = new THREE.Vector3(0,0,0);
		const h2 = new THREE.Vector3(vertex.x,vertex.y,vertex.z);
		const hypo = h1.distanceTo(h2);

		let scalar = this.farestVertex/hypo;
		// let normalisedVertex = {
		return {
			x: vertex.x * scalar,
			y: vertex.y * scalar,
			z: vertex.z * scalar
		};
		// normalisedVertex.multiplyScalar(scalar);
		// return normalisedVertex;
	}

	applyNoiseToVertex(vertex){

		let noisedVertex = new THREE.Vector3(vertex.x,vertex.y,vertex.z);
		let noiseValue = noise(
			this.noiseOptions.offset + vertex.x / this.sliceSize * this.noiseOptions.scale, 
			this.noiseOptions.offset + vertex.y / this.sliceSize * this.noiseOptions.scale, 
			this.noiseOptions.offset + vertex.z / this.sliceSize * this.noiseOptions.scale
		);

		// console.log("vertex ",vertex.x," ",vertex.y," ",vertex.z," / this.sliceSize ",this.sliceSize," : ",
		// 	vertex.x / this.sliceSize, 
		// 	vertex.y / this.sliceSize, 
		// 	vertex.z / this.sliceSize
		// );

		//
		let computedNoiseValue = (noiseValue * this.planeteOptions.groundLevel * this.noiseOptions.strength) + ((1 - this.noiseOptions.strength) / 2);
		// let computedNoiseValue = noiseValue * this.planeteOptions.groundLevel * this.noiseOptions.strength;
		let scalar;

		//
		if(computedNoiseValue > this.planeteOptions.waterLevel || !this.planeteOptions.showWater){
			// if(computedNoiseValue > this.planeteOptions.abyssesLevel){
				//
				scalar = computedNoiseValue;
			// } else {
			// 	scalar = this.planeteOptions.abyssesLevel;
			// }
		} else {
			scalar = this.planeteOptions.waterLevel;
		}

		return {
			x: vertex.x * scalar,
			y: vertex.y * scalar,
			z: vertex.z * scalar
		};
		// noisedVertex.multiplyScalar(scalar);
		// return noisedVertex;
	}

	colorVertex(x,y,z){
    	const center = new THREE.Vector3(0,0,0);
		const distanceFromCenter = new THREE.Vector3(x,y,z).distanceTo(center);
		if(distanceFromCenter >= (this.planeteOptions.waterLevel*this.planeteOptions.size) - (this.planeteOptions.size / 15) || !this.planeteOptions.showWater){
	    // if(distanceFromCenter >= this.planeteOptions.waterLevel || !this.planeteOptions.showWater){
	    	// Ground
	    	// console.log("ground");
	    	return [140,59,12];
	    } else {
	    	// Water
	    	// console.log("water");
	    	return [21,98,137];
	    }
	}

	initAFace(face_index){
		//
		const {size, resolution} = this.planeteOptions;

		//
		let faceGeometry = new THREE.BufferGeometry()/*.toNonIndexed()*/;
		let verticesArray = [];
		let colorsArray = [];

		// Vertices part
  		// Faces relative position
  		// X axis faces
  		if(face_index == 0) {
	    	const originVertex = new THREE.Vector3(-size/2,-size/2,size/2);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x+x*this.sliceSize;
			    		const ay = originVertex.y+y*this.sliceSize;
			    		const az = originVertex.z;
					    const computedA = this.computeVertex(ax,ay,az);
					    verticesArray.push(...computedA);
			    		colorsArray.push(...this.colorVertex(...computedA));
			    		const bx = originVertex.x+(x+1)*this.sliceSize;
			    		const by = originVertex.y+(y+1)*this.sliceSize;
			    		const bz = originVertex.z;
					    const computedB = this.computeVertex(bx,by,bz);
					    verticesArray.push(...computedB);
			    		colorsArray.push(...this.colorVertex(...computedB));
			    		const cx = originVertex.x+x*this.sliceSize;
			    		const cy = originVertex.y+(y+1)*this.sliceSize;
			    		const cz = originVertex.z;
					    const computedC = this.computeVertex(cx,cy,cz);
					    verticesArray.push(...computedC);
			    		colorsArray.push(...this.colorVertex(...computedC));

			    		//
			    		const dx = originVertex.x+x*this.sliceSize;
			    		const dy = originVertex.y+y*this.sliceSize;
			    		const dz = originVertex.z;
					    const computedD = this.computeVertex(dx,dy,dz);
					    verticesArray.push(...computedD);
			    		colorsArray.push(...this.colorVertex(...computedD));
			    		const ex = originVertex.x+(x+1)*this.sliceSize;
			    		const ey = originVertex.y+y*this.sliceSize;
			    		const ez = originVertex.z;
					    const computedE = this.computeVertex(ex,ey,ez);
					    verticesArray.push(...computedE);
			    		colorsArray.push(...this.colorVertex(...computedE));
			    		const fx = originVertex.x+(x+1)*this.sliceSize;
			    		const fy = originVertex.y+(y+1)*this.sliceSize;
			    		const fz = originVertex.z;
					    const computedF = this.computeVertex(fx,fy,fz);
					    verticesArray.push(...computedF);
					    colorsArray.push(...this.colorVertex(...computedF));

				}
			}
  		} else if(face_index == 1) {
	    	const originVertex = new THREE.Vector3(-size/2,-size/2,-size/2);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x+x*this.sliceSize;
			    		const ay = originVertex.y+y*this.sliceSize;
			    		const az = originVertex.z;
					    const computedA = this.computeVertex(ax,ay,az);
					    verticesArray.push(...computedA);
			    		colorsArray.push(...this.colorVertex(...computedA));
			    		const bx = originVertex.x+(x+1)*this.sliceSize;
			    		const by = originVertex.y+y*this.sliceSize;
			    		const bz = originVertex.z;
					    const computedB = this.computeVertex(bx,by,bz);
					    verticesArray.push(...computedB);
			    		colorsArray.push(...this.colorVertex(...computedB));
			    		const cx = originVertex.x+x*this.sliceSize;
			    		const cy = originVertex.y+(y+1)*this.sliceSize;
			    		const cz = originVertex.z;
					    const computedC = this.computeVertex(cx,cy,cz);
					    verticesArray.push(...computedC);
			    		colorsArray.push(...this.colorVertex(...computedC));

			    		//
			    		const dx = originVertex.x+x*this.sliceSize;
			    		const dy = originVertex.y+(y+1)*this.sliceSize;
			    		const dz = originVertex.z;
					    const computedD = this.computeVertex(dx,dy,dz);
					    verticesArray.push(...computedD);
			    		colorsArray.push(...this.colorVertex(...computedD));
			    		const ex = originVertex.x+(x+1)*this.sliceSize;
			    		const ey = originVertex.y+y*this.sliceSize;
			    		const ez = originVertex.z;
					    const computedE = this.computeVertex(ex,ey,ez);
					    verticesArray.push(...computedE);
			    		colorsArray.push(...this.colorVertex(...computedE));
			    		const fx = originVertex.x+(x+1)*this.sliceSize;
			    		const fy = originVertex.y+(y+1)*this.sliceSize;
			    		const fz = originVertex.z;
					    const computedF = this.computeVertex(fx,fy,fz);
					    verticesArray.push(...computedF);
					    colorsArray.push(...this.colorVertex(...computedF));

				}						

			}
		// Y axis faces
  		} else if(face_index == 2) {
	    	const originVertex = new THREE.Vector3(size/2,-size/2,-size/2);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x;
			    		const ay = originVertex.y+y*this.sliceSize;
			    		const az = originVertex.z+(x+1)*this.sliceSize;
					    const computedA = this.computeVertex(ax,ay,az);
					    verticesArray.push(...computedA);
			    		colorsArray.push(...this.colorVertex(...computedA));
			    		const bx = originVertex.x;
			    		const by = originVertex.y+(y+1)*this.sliceSize;
			    		const bz = originVertex.z+(x+1)*this.sliceSize;
					    const computedB = this.computeVertex(bx,by,bz);
					    verticesArray.push(...computedB);
			    		colorsArray.push(...this.colorVertex(...computedB));
			    		const cx = originVertex.x;
			    		const cy = originVertex.y+(y+1)*this.sliceSize;
			    		const cz = originVertex.z+x*this.sliceSize;
					    const computedC = this.computeVertex(cx,cy,cz);
					    verticesArray.push(...computedC);
			    		colorsArray.push(...this.colorVertex(...computedC));

			    		//
			    		const dx = originVertex.x;
			    		const dy = originVertex.y+y*this.sliceSize;
			    		const dz = originVertex.z+x*this.sliceSize;
					    const computedD = this.computeVertex(dx,dy,dz);
					    verticesArray.push(...computedD);
			    		colorsArray.push(...this.colorVertex(...computedD));
			    		const ex = originVertex.x;
			    		const ey = originVertex.y+y*this.sliceSize;
			    		const ez = originVertex.z+(x+1)*this.sliceSize;
					    const computedE = this.computeVertex(ex,ey,ez);
					    verticesArray.push(...computedE);
			    		colorsArray.push(...this.colorVertex(...computedE));
			    		const fx = originVertex.x;
			    		const fy = originVertex.y+(y+1)*this.sliceSize;
			    		const fz = originVertex.z+x*this.sliceSize;
					    const computedF = this.computeVertex(fx,fy,fz);
					    verticesArray.push(...computedF);
					    colorsArray.push(...this.colorVertex(...computedF));

				}						

			}
  		} else if(face_index == 3) {
	    	const originVertex = new THREE.Vector3(-size/2,-size/2,-size/2);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x;
			    		const ay = originVertex.y+y*this.sliceSize;
			    		const az = originVertex.z+x*this.sliceSize;
					    const computedA = this.computeVertex(ax,ay,az);
					    verticesArray.push(...computedA);
			    		colorsArray.push(...this.colorVertex(...computedA));
			    		const bx = originVertex.x;
			    		const by = originVertex.y+(y+1)*this.sliceSize;
			    		const bz = originVertex.z+(x+1)*this.sliceSize;
					    const computedB = this.computeVertex(bx,by,bz);
					    verticesArray.push(...computedB);
			    		colorsArray.push(...this.colorVertex(...computedB));
			    		const cx = originVertex.x;
			    		const cy = originVertex.y+(y+1)*this.sliceSize;
			    		const cz = originVertex.z+x*this.sliceSize;
					    const computedC = this.computeVertex(cx,cy,cz);
					    verticesArray.push(...computedC);
			    		colorsArray.push(...this.colorVertex(...computedC));

			    		//
			    		const dx = originVertex.x;
			    		const dy = originVertex.y+y*this.sliceSize;
			    		const dz = originVertex.z+x*this.sliceSize;
					    const computedD = this.computeVertex(dx,dy,dz);
					    verticesArray.push(...computedD);
			    		colorsArray.push(...this.colorVertex(...computedD));
			    		const ex = originVertex.x;
			    		const ey = originVertex.y+y*this.sliceSize;
			    		const ez = originVertex.z+(x+1)*this.sliceSize;
					    const computedE = this.computeVertex(ex,ey,ez);
					    verticesArray.push(...computedE);
			    		colorsArray.push(...this.colorVertex(...computedE));
			    		const fx = originVertex.x;
			    		const fy = originVertex.y+(y+1)*this.sliceSize;
			    		const fz = originVertex.z+(x+1)*this.sliceSize;
					    const computedF = this.computeVertex(fx,fy,fz);
					    verticesArray.push(...computedF);
					    colorsArray.push(...this.colorVertex(...computedF));

				}						

			}
  		// Z axis faces
  		} else if(face_index == 4) {
	    	const originVertex = new THREE.Vector3(-size/2,size/2,-size/2);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x+x*this.sliceSize;
			    		const ay = originVertex.y;
			    		const az = originVertex.z+y*this.sliceSize;
					    const computedA = this.computeVertex(ax,ay,az);
					    verticesArray.push(...computedA);
			    		colorsArray.push(...this.colorVertex(...computedA));
			    		const bx = originVertex.x+(x+1)*this.sliceSize;
			    		const by = originVertex.y;
			    		const bz = originVertex.z+y*this.sliceSize;
					    const computedB = this.computeVertex(bx,by,bz);
					    verticesArray.push(...computedB);
			    		colorsArray.push(...this.colorVertex(...computedB));
			    		const cx = originVertex.x+x*this.sliceSize;
			    		const cy = originVertex.y;
			    		const cz = originVertex.z+(y+1)*this.sliceSize;
					    const computedC = this.computeVertex(cx,cy,cz);
					    verticesArray.push(...computedC);
			    		colorsArray.push(...this.colorVertex(...computedC));

			    		//
			    		const dx = originVertex.x+x*this.sliceSize;
			    		const dy = originVertex.y;
			    		const dz = originVertex.z+(y+1)*this.sliceSize;
					    const computedD = this.computeVertex(dx,dy,dz);
					    verticesArray.push(...computedD);
			    		colorsArray.push(...this.colorVertex(...computedD));
			    		const ex = originVertex.x+(x+1)*this.sliceSize;
			    		const ey = originVertex.y;
			    		const ez = originVertex.z+y*this.sliceSize;
					    const computedE = this.computeVertex(ex,ey,ez);
					    verticesArray.push(...computedE);
			    		colorsArray.push(...this.colorVertex(...computedE));
			    		const fx = originVertex.x+(x+1)*this.sliceSize;
			    		const fy = originVertex.y;
			    		const fz = originVertex.z+(y+1)*this.sliceSize;
					    const computedF = this.computeVertex(fx,fy,fz);
					    verticesArray.push(...computedF);
					    colorsArray.push(...this.colorVertex(...computedF));

				}						

			}
  		} else if(face_index == 5) {
	    	const originVertex = new THREE.Vector3(-size/2,-size/2,-size/2);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x+x*this.sliceSize;
			    		const ay = originVertex.y;
			    		const az = originVertex.z+y*this.sliceSize;
					    const computedA = this.computeVertex(ax,ay,az);
					    verticesArray.push(...computedA);
			    		colorsArray.push(...this.colorVertex(...computedA));
			    		const bx = originVertex.x+(x+1)*this.sliceSize;
			    		const by = originVertex.y;
			    		const bz = originVertex.z+(y+1)*this.sliceSize;
					    const computedB = this.computeVertex(bx,by,bz);
					    verticesArray.push(...computedB);
			    		colorsArray.push(...this.colorVertex(...computedB));
			    		const cx = originVertex.x+x*this.sliceSize;
			    		const cy = originVertex.y;
			    		const cz = originVertex.z+(y+1)*this.sliceSize;
					    const computedC = this.computeVertex(cx,cy,cz);
					    verticesArray.push(...computedC);
			    		colorsArray.push(...this.colorVertex(...computedC));

			    		//
			    		const dx = originVertex.x+x*this.sliceSize;
			    		const dy = originVertex.y;
			    		const dz = originVertex.z+y*this.sliceSize;
					    const computedD = this.computeVertex(dx,dy,dz);
					    verticesArray.push(...computedD);
			    		colorsArray.push(...this.colorVertex(...computedD));
			    		const ex = originVertex.x+(x+1)*this.sliceSize;
			    		const ey = originVertex.y;
			    		const ez = originVertex.z+y*this.sliceSize;
					    const computedE = this.computeVertex(ex,ey,ez);
					    verticesArray.push(...computedE);
			    		colorsArray.push(...this.colorVertex(...computedE));
			    		const fx = originVertex.x+(x+1)*this.sliceSize;
			    		const fy = originVertex.y;
			    		const fz = originVertex.z+(y+1)*this.sliceSize;
					    const computedF = this.computeVertex(fx,fy,fz);
					    verticesArray.push(...computedF);
					    colorsArray.push(...this.colorVertex(...computedF));

				}						

			}
  		}
		
		let faceVertices = new Float32Array(verticesArray);
		let faceColors = new Float32Array(colorsArray);

		// itemSize = 3 because there are 3 values (components) per vertex
		faceGeometry.addAttribute('position', new THREE.BufferAttribute(faceVertices, 3));
		faceGeometry.addAttribute('color', new THREE.BufferAttribute(faceColors, 3));
		faceGeometry.computeVertexNormals(true);
		// faceGeometry.computeBoundingSphere();
		// let faceMesh = new THREE.Mesh(faceGeometry, this.firstMaterial);
		let faceMesh = new THREE.Mesh(faceGeometry, this.firstMaterial);
		// faceMesh.geometry.computeVertexNormals(true)

		this.computed.add(faceMesh);
		// scene.add(faceMesh);
		// let mesh = new THREE.Mesh(geometry, firstMaterial);
		// this.computed.add(mesh);

	}

}