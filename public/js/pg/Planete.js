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

	initAFace(face_index){
		//
		const {size, resolution} = this.planeteOptions;

		//
		let faceGeometry = new THREE.BufferGeometry();
		let verticesArray = [];

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
					    verticesArray.push(...this.computeVertex(ax,ay,az));
			    		const bx = originVertex.x+(x+1)*this.sliceSize;
			    		const by = originVertex.y+(y+1)*this.sliceSize;
			    		const bz = originVertex.z;
					    verticesArray.push(...this.computeVertex(bx,by,bz));
			    		const cx = originVertex.x+x*this.sliceSize;
			    		const cy = originVertex.y+(y+1)*this.sliceSize;
			    		const cz = originVertex.z;
					    verticesArray.push(...this.computeVertex(cx,cy,cz));
			    		const dx = originVertex.x+x*this.sliceSize;
			    		const dy = originVertex.y+y*this.sliceSize;
			    		const dz = originVertex.z;
					    verticesArray.push(...this.computeVertex(dx,dy,dz));
			    		const ex = originVertex.x+(x+1)*this.sliceSize;
			    		const ey = originVertex.y+y*this.sliceSize;
			    		const ez = originVertex.z;
					    verticesArray.push(...this.computeVertex(ex,ey,ez));
			    		const fx = originVertex.x+(x+1)*this.sliceSize;
			    		const fy = originVertex.y+(y+1)*this.sliceSize;
			    		const fz = originVertex.z;
					    verticesArray.push(...this.computeVertex(fx,fy,fz));


				  	// 	// Materials part
					  //   for(let i=0;i<this.verticesArray.length;i+=3){
							// // let geometry = new THREE.BufferGeometry();
					    	
							// // geometry.vertices.push(
							// // 	this.verteces[i],
							// // 	this.verteces[i+1],
							// // 	this.verteces[i+2]
							// // );

							// // geometry.faces.push(new THREE.Face3(0, 1, 2));
							// // geometry.computeBoundingSphere();
					  //   	// geometry.computeVertexNormals(true);
							// if(!secondMaterial) {
							// 	let mesh = new THREE.Mesh(geometry, firstMaterial);
							// 	// mesh.geometry.computeVertexNormals(true)
							// 	this.computed.add(mesh);
							// } else {

							// 	const center = new THREE.Vector3(0,0,0);
							// 	const averageHeight = (
							// 		center.distanceTo(this.verteces[i])
							// 		+ center.distanceTo(this.verteces[i+1])
							// 		+ center.distanceTo(this.verteces[i+2])
							// 		)/3;

							// 	// if(coef >= this.planeteOptions.waterLevel * (this.planeteOptions.size-13)  || !this.planeteOptions.showWater){
							// 	if(averageHeight >= (this.planeteOptions.waterLevel*this.planeteOptions.size) - (this.planeteOptions.size / 15) || !this.planeteOptions.showWater){
							// 		let mesh = new THREE.Mesh(geometry, secondMaterial);
							// 		// mesh.geometry.computeVertexNormals(true);
							// 		this.computed.add(mesh);
							// 	} else {
							// 		let mesh = new THREE.Mesh(geometry, firstMaterial);
							// 		// mesh.geometry.computeVertexNormals(true);
							// 		this.computed.add(new THREE.Mesh(geometry, firstMaterial));
							// 	}
							// }

					  //   }


				}
			}
  		} else if(face_index == 1) {
	    	const originVertex = new THREE.Vector3(-size/2,-size/2,-size/2);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x+x*this.sliceSize;
			    		const ay = originVertex.y+y*this.sliceSize;
			    		const az = originVertex.z;
					    verticesArray.push(...this.computeVertex(ax,ay,az));
			    		const bx = originVertex.x+(x+1)*this.sliceSize;
			    		const by = originVertex.y+y*this.sliceSize;
			    		const bz = originVertex.z;
					    verticesArray.push(...this.computeVertex(bx,by,bz));
			    		const cx = originVertex.x+x*this.sliceSize;
			    		const cy = originVertex.y+(y+1)*this.sliceSize;
			    		const cz = originVertex.z;
					    verticesArray.push(...this.computeVertex(cx,cy,cz));
			    		const dx = originVertex.x+x*this.sliceSize;
			    		const dy = originVertex.y+(y+1)*this.sliceSize;
			    		const dz = originVertex.z;
					    verticesArray.push(...this.computeVertex(dx,dy,dz));
			    		const ex = originVertex.x+(x+1)*this.sliceSize;
			    		const ey = originVertex.y+y*this.sliceSize;
			    		const ez = originVertex.z;
					    verticesArray.push(...this.computeVertex(ex,ey,ez));
			    		const fx = originVertex.x+(x+1)*this.sliceSize;
			    		const fy = originVertex.y+(y+1)*this.sliceSize;
			    		const fz = originVertex.z;
					    verticesArray.push(...this.computeVertex(fx,fy,fz));
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
					    verticesArray.push(...this.computeVertex(ax,ay,az));
			    		const bx = originVertex.x;
			    		const by = originVertex.y+(y+1)*this.sliceSize;
			    		const bz = originVertex.z+(x+1)*this.sliceSize;
					    verticesArray.push(...this.computeVertex(bx,by,bz));
			    		const cx = originVertex.x;
			    		const cy = originVertex.y+(y+1)*this.sliceSize;
			    		const cz = originVertex.z+x*this.sliceSize;
					    verticesArray.push(...this.computeVertex(cx,cy,cz));
			    		const dx = originVertex.x;
			    		const dy = originVertex.y+y*this.sliceSize;
			    		const dz = originVertex.z+x*this.sliceSize;
					    verticesArray.push(...this.computeVertex(dx,dy,dz));
			    		const ex = originVertex.x;
			    		const ey = originVertex.y+y*this.sliceSize;
			    		const ez = originVertex.z+(x+1)*this.sliceSize;
					    verticesArray.push(...this.computeVertex(ex,ey,ez));
			    		const fx = originVertex.x;
			    		const fy = originVertex.y+(y+1)*this.sliceSize;
			    		const fz = originVertex.z+x*this.sliceSize;
					    verticesArray.push(...this.computeVertex(fx,fy,fz));
				}
			}
  		} else if(face_index == 3) {
	    	const originVertex = new THREE.Vector3(-size/2,-size/2,-size/2);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x;
			    		const ay = originVertex.y+y*this.sliceSize;
			    		const az = originVertex.z+x*this.sliceSize;
					    verticesArray.push(...this.computeVertex(ax,ay,az));
			    		const bx = originVertex.x;
			    		const by = originVertex.y+(y+1)*this.sliceSize;
			    		const bz = originVertex.z+(x+1)*this.sliceSize;
					    verticesArray.push(...this.computeVertex(bx,by,bz));
			    		const cx = originVertex.x;
			    		const cy = originVertex.y+(y+1)*this.sliceSize;
			    		const cz = originVertex.z+x*this.sliceSize;
					    verticesArray.push(...this.computeVertex(cx,cy,cz));
			    		const dx = originVertex.x;
			    		const dy = originVertex.y+y*this.sliceSize;
			    		const dz = originVertex.z+x*this.sliceSize;
					    verticesArray.push(...this.computeVertex(dx,dy,dz));
			    		const ex = originVertex.x;
			    		const ey = originVertex.y+y*this.sliceSize;
			    		const ez = originVertex.z+(x+1)*this.sliceSize;
					    verticesArray.push(...this.computeVertex(ex,ey,ez));
			    		const fx = originVertex.x;
			    		const fy = originVertex.y+(y+1)*this.sliceSize;
			    		const fz = originVertex.z+(x+1)*this.sliceSize;
					    verticesArray.push(...this.computeVertex(fx,fy,fz));
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
					    verticesArray.push(...this.computeVertex(ax,ay,az));
			    		const bx = originVertex.x+(x+1)*this.sliceSize;
			    		const by = originVertex.y;
			    		const bz = originVertex.z+y*this.sliceSize;
					    verticesArray.push(...this.computeVertex(bx,by,bz));
			    		const cx = originVertex.x+x*this.sliceSize;
			    		const cy = originVertex.y;
			    		const cz = originVertex.z+(y+1)*this.sliceSize;
					    verticesArray.push(...this.computeVertex(cx,cy,cz));
			    		const dx = originVertex.x+x*this.sliceSize;
			    		const dy = originVertex.y;
			    		const dz = originVertex.z+(y+1)*this.sliceSize;
					    verticesArray.push(...this.computeVertex(dx,dy,dz));
			    		const ex = originVertex.x+(x+1)*this.sliceSize;
			    		const ey = originVertex.y;
			    		const ez = originVertex.z+y*this.sliceSize;
					    verticesArray.push(...this.computeVertex(ex,ey,ez));
			    		const fx = originVertex.x+(x+1)*this.sliceSize;
			    		const fy = originVertex.y;
			    		const fz = originVertex.z+(y+1)*this.sliceSize;
					    verticesArray.push(...this.computeVertex(fx,fy,fz));
				}
			}
  		} else if(face_index == 5) {
	    	const originVertex = new THREE.Vector3(-size/2,-size/2,-size/2);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x+x*this.sliceSize;
			    		const ay = originVertex.y;
			    		const az = originVertex.z+y*this.sliceSize;
					    verticesArray.push(...this.computeVertex(ax,ay,az));
			    		const bx = originVertex.x+(x+1)*this.sliceSize;
			    		const by = originVertex.y;
			    		const bz = originVertex.z+(y+1)*this.sliceSize;
					    verticesArray.push(...this.computeVertex(bx,by,bz));
			    		const cx = originVertex.x+x*this.sliceSize;
			    		const cy = originVertex.y;
			    		const cz = originVertex.z+(y+1)*this.sliceSize;
					    verticesArray.push(...this.computeVertex(cx,cy,cz));
			    		const dx = originVertex.x+x*this.sliceSize;
			    		const dy = originVertex.y;
			    		const dz = originVertex.z+y*this.sliceSize;
					    verticesArray.push(...this.computeVertex(dx,dy,dz));
			    		const ex = originVertex.x+(x+1)*this.sliceSize;
			    		const ey = originVertex.y;
			    		const ez = originVertex.z+y*this.sliceSize;
					    verticesArray.push(...this.computeVertex(ex,ey,ez));
			    		const fx = originVertex.x+(x+1)*this.sliceSize;
			    		const fy = originVertex.y;
			    		const fz = originVertex.z+(y+1)*this.sliceSize;
					    verticesArray.push(...this.computeVertex(fx,fy,fz));
				}
			}
  		}
		
		let faceVertices = new Float32Array(verticesArray);

		// itemSize = 3 because there are 3 values (components) per vertex
		faceGeometry.addAttribute('position', new THREE.BufferAttribute(faceVertices, 3));
		// faceGeometry.computeBoundingSphere();
		let faceMesh = new THREE.Mesh(faceGeometry, this.firstMaterial);

		this.computed.add(faceMesh);
		// scene.add(faceMesh);
		// let mesh = new THREE.Mesh(geometry, firstMaterial);
		// // mesh.geometry.computeVertexNormals(true)
		// this.computed.add(mesh);

	}

}