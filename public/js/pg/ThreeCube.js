class ThreeCube {

	constructor() {
		this.computed = new THREE.Group();
		this.faces = null;
		this.farestVertex = null;
		this.firstMaterial = null;
		this.secondMaterial = null;

		this.noiseOptions = null;
	}

	init(planeteOptions, noiseOptions, firstMaterial = this.firstMaterial, secondMaterial = this.secondMaterial){

		let {size, resolution} = planeteOptions;
		this.firstMaterial = firstMaterial;
		this.secondMaterial = secondMaterial;

		let faces = []
		for (let i=0; i<6; i++) {
			let face = new Face();
			face.init(i, size, resolution, planeteOptions, noiseOptions, firstMaterial, secondMaterial);
			faces.push(face);
		}
		this.faces = faces;
		
		// console.log(
		// 	"Distance from center to farest cube edge : ", 
		// 	Math.sqrt(Math.pow(Math.sqrt(Math.pow(size,2)+Math.pow(size,2))/2,2)+Math.pow(size/2,2))
		// );
		let v1 = new THREE.Vector3(0,0,0);
		let v2 = new THREE.Vector3(size/2,size/2,size/2);

		this.farestVertex = v1.distanceTo(v2);
	}

	draw(){
		this.faces.forEach((face, face_i) => {
			// this.computed.add(this.faces[face_i].computed);
			face.draw(this.firstMaterial, this.secondMaterial);
		});
		// scene.add(this.computed);
	}

	remove(){
		this.faces.forEach((face, face_i) => {
			face.remove();
		});
		// scene.remove(this.computed);
	}

}

class Face {

	constructor(){
		this.verteces = [];
		this.computed = new THREE.Group();
		this.planeteOptions = null;
		this.noiseOptions = null;
	}

	computeVertex(originVertex,farestVertex,x,y,z){

		let newVertex;
		newVertex = this.normaliseVertex(originVertex,farestVertex,x,y,z);
		newVertex = this.applyNoiseToVertex(newVertex);

		return newVertex;
	}

	normaliseVertex(originVertex,farestVertex,x,y,z){

		const h1 = new THREE.Vector3(0,0,0);
		const h2 = new THREE.Vector3(x,y,z);
		const hypo = h1.distanceTo(h2);

		let scalar = farestVertex/hypo;
		let normalisedVertex = new THREE.Vector3(x,y,z);
		normalisedVertex.multiplyScalar(scalar);

		return normalisedVertex;
	}

	applyNoiseToVertex(vertex, noiseOptions){

		let noisedVertex = new THREE.Vector3(vertex.x,vertex.y,vertex.z);
		const noiseValue = noise(
			this.noiseOptions.offset + vertex.x * this.noiseOptions.scale, 
			this.noiseOptions.offset + vertex.y * this.noiseOptions.scale, 
			this.noiseOptions.offset + vertex.z * this.noiseOptions.scale
		);

		noisedVertex.multiplyScalar(
			// noiseValue
			noiseValue > this.planeteOptions.waterLevel || !this.planeteOptions.showWater
				 ? 
				noiseValue * this.noiseOptions.strength
				 :
				this.planeteOptions.waterLevel
		);
		// console.log(noise(vertex.x, vertex.y, vertex.z));
		return noisedVertex;
	}

	// TO DO ( éviter la répétition dans la fonction init() )
	init(face_index, size, resolution, planeteOptions, noiseOptions, firstMaterial, secondMaterial){
		
		this.planeteOptions = planeteOptions;
		this.noiseOptions = noiseOptions;

		const v1 = new THREE.Vector3(0,0,0);
		const v2 = new THREE.Vector3(size/2,size/2,size/2);
		const farestVertex = v1.distanceTo(v2);

		// Verctors part
  		// Faces relative position
  		// X axis faces
  		if(face_index == 0) {
	    	const originVertex = new THREE.Vector3(-size/2,-size/2,size/2);
		    const sliceSize = size/(resolution-1);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x+x*sliceSize;
			    		const ay = originVertex.y+y*sliceSize;
			    		const az = originVertex.z;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,ax,ay,az));
			    		const bx = originVertex.x+(x+1)*sliceSize;
			    		const by = originVertex.y+(y+1)*sliceSize;
			    		const bz = originVertex.z;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,bx,by,bz));
			    		const cx = originVertex.x+x*sliceSize;
			    		const cy = originVertex.y+(y+1)*sliceSize;
			    		const cz = originVertex.z;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,cx,cy,cz));
			    		const dx = originVertex.x+x*sliceSize;
			    		const dy = originVertex.y+y*sliceSize;
			    		const dz = originVertex.z;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,dx,dy,dz));
			    		const ex = originVertex.x+(x+1)*sliceSize;
			    		const ey = originVertex.y+y*sliceSize;
			    		const ez = originVertex.z;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,ex,ey,ez));
			    		const fx = originVertex.x+(x+1)*sliceSize;
			    		const fy = originVertex.y+(y+1)*sliceSize;
			    		const fz = originVertex.z;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,fx,fy,fz));
				}
			}
  		} else if(face_index == 1) {
	    	const originVertex = new THREE.Vector3(-size/2,-size/2,-size/2);
		    const sliceSize = size/(resolution-1);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x+x*sliceSize;
			    		const ay = originVertex.y+y*sliceSize;
			    		const az = originVertex.z;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,ax,ay,az));
			    		const bx = originVertex.x+(x+1)*sliceSize;
			    		const by = originVertex.y+y*sliceSize;
			    		const bz = originVertex.z;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,bx,by,bz));
			    		const cx = originVertex.x+x*sliceSize;
			    		const cy = originVertex.y+(y+1)*sliceSize;
			    		const cz = originVertex.z;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,cx,cy,cz));
			    		const dx = originVertex.x+x*sliceSize;
			    		const dy = originVertex.y+(y+1)*sliceSize;
			    		const dz = originVertex.z;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,dx,dy,dz));
			    		const ex = originVertex.x+(x+1)*sliceSize;
			    		const ey = originVertex.y+y*sliceSize;
			    		const ez = originVertex.z;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,ex,ey,ez));
			    		const fx = originVertex.x+(x+1)*sliceSize;
			    		const fy = originVertex.y+(y+1)*sliceSize;
			    		const fz = originVertex.z;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,fx,fy,fz));
				}
			}
		// Y axis faces
  		} else if(face_index == 2) {
	    	const originVertex = new THREE.Vector3(size/2,-size/2,-size/2);
		    const sliceSize = size/(resolution-1);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x;
			    		const ay = originVertex.y+y*sliceSize;
			    		const az = originVertex.z+(x+1)*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,ax,ay,az));
			    		const bx = originVertex.x;
			    		const by = originVertex.y+(y+1)*sliceSize;
			    		const bz = originVertex.z+(x+1)*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,bx,by,bz));
			    		const cx = originVertex.x;
			    		const cy = originVertex.y+(y+1)*sliceSize;
			    		const cz = originVertex.z+x*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,cx,cy,cz));
			    		const dx = originVertex.x;
			    		const dy = originVertex.y+y*sliceSize;
			    		const dz = originVertex.z+x*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,dx,dy,dz));
			    		const ex = originVertex.x;
			    		const ey = originVertex.y+y*sliceSize;
			    		const ez = originVertex.z+(x+1)*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,ex,ey,ez));
			    		const fx = originVertex.x;
			    		const fy = originVertex.y+(y+1)*sliceSize;
			    		const fz = originVertex.z+x*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,fx,fy,fz));
				}
			}
  		} else if(face_index == 3) {
	    	const originVertex = new THREE.Vector3(-size/2,-size/2,-size/2);
		    const sliceSize = size/(resolution-1);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x;
			    		const ay = originVertex.y+y*sliceSize;
			    		const az = originVertex.z+x*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,ax,ay,az));
			    		const bx = originVertex.x;
			    		const by = originVertex.y+(y+1)*sliceSize;
			    		const bz = originVertex.z+(x+1)*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,bx,by,bz));
			    		const cx = originVertex.x;
			    		const cy = originVertex.y+(y+1)*sliceSize;
			    		const cz = originVertex.z+x*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,cx,cy,cz));
			    		const dx = originVertex.x;
			    		const dy = originVertex.y+y*sliceSize;
			    		const dz = originVertex.z+x*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,dx,dy,dz));
			    		const ex = originVertex.x;
			    		const ey = originVertex.y+y*sliceSize;
			    		const ez = originVertex.z+(x+1)*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,ex,ey,ez));
			    		const fx = originVertex.x;
			    		const fy = originVertex.y+(y+1)*sliceSize;
			    		const fz = originVertex.z+(x+1)*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,fx,fy,fz));
				}
			}
  		// Z axis faces
  		} else if(face_index == 4) {
	    	const originVertex = new THREE.Vector3(-size/2,-size/2,-size/2);
		    const sliceSize = size/(resolution-1);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x+x*sliceSize;
			    		const ay = originVertex.y;
			    		const az = originVertex.z+y*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,ax,ay,az));
			    		const bx = originVertex.x+(x+1)*sliceSize;
			    		const by = originVertex.y;
			    		const bz = originVertex.z+(y+1)*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,bx,by,bz));
			    		const cx = originVertex.x+x*sliceSize;
			    		const cy = originVertex.y;
			    		const cz = originVertex.z+(y+1)*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,cx,cy,cz));
			    		const dx = originVertex.x+x*sliceSize;
			    		const dy = originVertex.y;
			    		const dz = originVertex.z+y*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,dx,dy,dz));
			    		const ex = originVertex.x+(x+1)*sliceSize;
			    		const ey = originVertex.y;
			    		const ez = originVertex.z+y*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,ex,ey,ez));
			    		const fx = originVertex.x+(x+1)*sliceSize;
			    		const fy = originVertex.y;
			    		const fz = originVertex.z+(y+1)*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,fx,fy,fz));
				}
			}
  		} else if(face_index == 5) {
	    	const originVertex = new THREE.Vector3(-size/2,size/2,-size/2);
		    const sliceSize = size/(resolution-1);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x+x*sliceSize;
			    		const ay = originVertex.y;
			    		const az = originVertex.z+y*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,ax,ay,az));
			    		const bx = originVertex.x+(x+1)*sliceSize;
			    		const by = originVertex.y;
			    		const bz = originVertex.z+y*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,bx,by,bz));
			    		const cx = originVertex.x+x*sliceSize;
			    		const cy = originVertex.y;
			    		const cz = originVertex.z+(y+1)*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,cx,cy,cz));
			    		const dx = originVertex.x+x*sliceSize;
			    		const dy = originVertex.y;
			    		const dz = originVertex.z+(y+1)*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,dx,dy,dz));
			    		const ex = originVertex.x+(x+1)*sliceSize;
			    		const ey = originVertex.y;
			    		const ez = originVertex.z+y*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,ex,ey,ez));
			    		const fx = originVertex.x+(x+1)*sliceSize;
			    		const fy = originVertex.y;
			    		const fz = originVertex.z+(y+1)*sliceSize;
					    this.verteces.push(this.computeVertex(originVertex,farestVertex,fx,fy,fz));
				}
			}
  		}

  	// 	// Materials part
	  //   for(let i=0;i<this.verteces.length;i+=3){
			// let geometry = new THREE.Geometry();
	    	
			// geometry.vertices.push(
			// 	this.verteces[i],
			// 	this.verteces[i+1],
			// 	this.verteces[i+2]
			// );

			// geometry.faces.push(new THREE.Face3(0, 1, 2));
			// geometry.computeBoundingSphere();

			// if(!secondMaterial) {
			// 	let mesh = new THREE.Mesh(geometry, firstMaterial);
			// 	this.computed.add(mesh);
			// } else {

			// 	const center = new THREE.Vector3(0,0,0);
			// 	const coef = (
			// 		center.distanceTo(this.verteces[i])
			// 		+ center.distanceTo(this.verteces[i+1])
			// 		+ center.distanceTo(this.verteces[i+2])
			// 		)/3;

			// 	if(coef <= this.planeteOptions.waterLevel * 260 ){
			// 		this.computed.add(new THREE.Mesh(geometry, firstMaterial));
			// 	} else {
			// 		this.computed.add(new THREE.Mesh(geometry, secondMaterial));
			// 	}
			// }

	  //   }

	}

    draw(firstMaterial, secondMaterial) {
  		// Materials part
	    for(let i=0;i<this.verteces.length;i+=3){
			let geometry = new THREE.Geometry();
	    	
			geometry.vertices.push(
				this.verteces[i],
				this.verteces[i+1],
				this.verteces[i+2]
			);

			geometry.faces.push(new THREE.Face3(0, 1, 2));
			geometry.computeBoundingSphere();

			if(!secondMaterial) {
				let mesh = new THREE.Mesh(geometry, firstMaterial);
				this.computed.add(mesh);
			} else {

				const center = new THREE.Vector3(0,0,0);
				const coef = (
					center.distanceTo(this.verteces[i])
					+ center.distanceTo(this.verteces[i+1])
					+ center.distanceTo(this.verteces[i+2])
					)/3;

				if(coef >= this.planeteOptions.waterLevel * 260  || !this.planeteOptions.showWater){
					this.computed.add(new THREE.Mesh(geometry, secondMaterial));
				} else {
					this.computed.add(new THREE.Mesh(geometry, firstMaterial));
				}
			}

	    }

	    scene.add(this.computed);
    }

	remove() {
		scene.remove(this.computed);
	}

}