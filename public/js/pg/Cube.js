class Cube {

	constructor() {
		this.faces = null;
		this.farestVertex = null;
	}

	init(size, resolution){

		let faces = []
		for (let i=0; i<6; i++) {
			let face = new Face();
			face.init(i, size, resolution);
			faces.push(face);
		}
		this.faces = faces;
		
		// console.log(
		// 	"Distance from center to farest cube edge : ", 
		// 	Math.sqrt(Math.pow(Math.sqrt(Math.pow(size,2)+Math.pow(size,2))/2,2)+Math.pow(size/2,2))
		// );
		let v1 = createVector(0,0,0);
		let v2 = createVector(size/2,size/2,size/2);
		// console.log(
		// 	"first vertex position : ", 
		// 	v1.dist(v2)
		// );
		this.farestVertex = v1.dist(v2);
	}

	draw(){
		this.faces.forEach((face, face_i) => {
			face.draw();
		});
	}

}

class Face {

	constructor(){
		this.verteces = [];
	}

	init(face_index, size, resolution){

		const v1 = createVector(0,0,0);
		const v2 = createVector(size/2,size/2,size/2);
		const farestVertex = v1.dist(v2);

  		// Faces relative position
  		// X axis faces
  		if(face_index == 0) {
	    	const originVertex = createVector(-size/2,-size/2,size/2);
		    const sliceSize = size/(resolution-1);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {

			    		const ax = originVertex.x+x*sliceSize;
			    		const ay = originVertex.y+y*sliceSize;
			    		const az = originVertex.z;
						const o1A = createVector(0,0,originVertex.z);
						const o2A = createVector(ax,ay,az);
						const oppositeA = o1A.dist(o2A);
						const a1A = createVector(0,0,0);
						const a2A = createVector(0,0,originVertex.z);
						const adjacentA = a1A.dist(a2A);
						const angleA = Math.atan(oppositeA / adjacentA);
					    this.verteces.push({angle:angleA,x:ax,y:ay,z:az});

			    		const bx = originVertex.x+(x+1)*sliceSize;
			    		const by = originVertex.y+(y+1)*sliceSize;
			    		const bz = originVertex.z;
						const o1B = createVector(0,0,originVertex.z);
						const o2B = createVector(bx,by,bz);
						const oppositeB = o1B.dist(o2B);
						const a1B = createVector(0,0,0);
						const a2B = createVector(0,0,originVertex.z);
						const adjacentB = a1B.dist(a2B);
						const angleB = Math.atan(oppositeB / adjacentB);
					    this.verteces.push({angle:angleB,x:bx,y:by,z:bz});

			    		const cx = originVertex.x+x*sliceSize;
			    		const cy = originVertex.y+(y+1)*sliceSize;
			    		const cz = originVertex.z;
						const o1C = createVector(0,0,originVertex.z);
						const o2C = createVector(cx,cy,cz);
						const oppositeC = o1C.dist(o2C);
						const a1C = createVector(0,0,0);
						const a2C = createVector(0,0,originVertex.z);
						const adjacentC = a1C.dist(a2C);
						const angleC = Math.atan(oppositeC / adjacentC);
					    this.verteces.push({angle:angleC,x:cx,y:cy,z:cz});
					    
			    		const dx = originVertex.x+x*sliceSize;
			    		const dy = originVertex.y+y*sliceSize;
			    		const dz = originVertex.z;
						const o1D = createVector(0,0,originVertex.z);
						const o2D = createVector(dx,dy,dz);
						const oppositeD = o1D.dist(o2D);
						const a1D = createVector(0,0,0);
						const a2D = createVector(0,0,originVertex.z);
						const adjacentD = a1D.dist(a2D);
						const angleD = Math.atan(oppositeD / adjacentD);
					    this.verteces.push({angle:angleD,x:dx,y:dy,z:dz});
					    
			    		const ex = originVertex.x+(x+1)*sliceSize;
			    		const ey = originVertex.y+y*sliceSize;
			    		const ez = originVertex.z;
						const o1E = createVector(0,0,originVertex.z);
						const o2E = createVector(ex,ey,ez);
						const oppositeE = o1E.dist(o2E);
						const a1E = createVector(0,0,0);
						const a2E = createVector(0,0,originVertex.z);
						const adjacentE = a1E.dist(a2E);
						const angleE = Math.atan(oppositeE / adjacentE);
					    this.verteces.push({angle:angleE,x:ex,y:ey,z:ez});
					    
			    		const fx = originVertex.x+(x+1)*sliceSize;
			    		const fy = originVertex.y+(y+1)*sliceSize;
			    		const fz = originVertex.z;
						const o1F = createVector(0,0,originVertex.z);
						const o2F = createVector(fx,fy,fz);
						const oppositeF = o1F.dist(o2F);
						const a1F = createVector(0,0,0);
						const a2F = createVector(0,0,originVertex.z);
						const adjacentF = a1F.dist(a2F);
						const angleF = Math.atan(oppositeF / adjacentF);
					    this.verteces.push({angle:angleF,x:fx,y:fy,z:fz});
				}
			}
  		} else if(face_index == 1) {
	    	const originVertex = createVector(-size/2,-size/2,-size/2);
		    const sliceSize = size/(resolution-1);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {
					    this.verteces.push({x:originVertex.x+x*sliceSize,y:originVertex.y+y*sliceSize,z:originVertex.z});
					    this.verteces.push({x:originVertex.x+(x+1)*sliceSize,y:originVertex.y+y*sliceSize,z:originVertex.z});
					    this.verteces.push({x:originVertex.x+x*sliceSize,y:originVertex.y+(y+1)*sliceSize,z:originVertex.z});
					    
					    this.verteces.push({x:originVertex.x+x*sliceSize,y:originVertex.y+(y+1)*sliceSize,z:originVertex.z});
					    this.verteces.push({x:originVertex.x+(x+1)*sliceSize,y:originVertex.y+y*sliceSize,z:originVertex.z});
					    this.verteces.push({x:originVertex.x+(x+1)*sliceSize,y:originVertex.y+(y+1)*sliceSize,z:originVertex.z});
				}
			}
		// Y axis faces
  		} else if(face_index == 2) {
	    	const originVertex = createVector(size/2,-size/2,-size/2);
		    const sliceSize = size/(resolution-1);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {
					    this.verteces.push({x:originVertex.x,y:originVertex.y+y*sliceSize,z:originVertex.z+(x+1)*sliceSize});
					    this.verteces.push({x:originVertex.x,y:originVertex.y+(y+1)*sliceSize,z:originVertex.z+(x+1)*sliceSize});
					    this.verteces.push({x:originVertex.x,y:originVertex.y+(y+1)*sliceSize,z:originVertex.z+x*sliceSize});
					    
					    this.verteces.push({x:originVertex.x,y:originVertex.y+y*sliceSize,z:originVertex.z+x*sliceSize});
					    this.verteces.push({x:originVertex.x,y:originVertex.y+y*sliceSize,z:originVertex.z+(x+1)*sliceSize});
					    this.verteces.push({x:originVertex.x,y:originVertex.y+(y+1)*sliceSize,z:originVertex.z+x*sliceSize});
				}
			}
  		} else if(face_index == 3) {
	    	const originVertex = createVector(-size/2,-size/2,-size/2);
		    const sliceSize = size/(resolution-1);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {
					    this.verteces.push({x:originVertex.x,y:originVertex.y+y*sliceSize,z:originVertex.z+x*sliceSize});
					    this.verteces.push({x:originVertex.x,y:originVertex.y+(y+1)*sliceSize,z:originVertex.z+(x+1)*sliceSize});
					    this.verteces.push({x:originVertex.x,y:originVertex.y+(y+1)*sliceSize,z:originVertex.z+x*sliceSize});
					    
					    this.verteces.push({x:originVertex.x,y:originVertex.y+y*sliceSize,z:originVertex.z+x*sliceSize});
					    this.verteces.push({x:originVertex.x,y:originVertex.y+y*sliceSize,z:originVertex.z+(x+1)*sliceSize});
					    this.verteces.push({x:originVertex.x,y:originVertex.y+(y+1)*sliceSize,z:originVertex.z+(x+1)*sliceSize});
				}
			}
  		// Z axis faces
  		} else if(face_index == 4) {
	    	const originVertex = createVector(-size/2,-size/2,-size/2);
		    const sliceSize = size/(resolution-1);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {
					    this.verteces.push({x:originVertex.x+x*sliceSize,y:originVertex.y,z:originVertex.z+y*sliceSize});
					    this.verteces.push({x:originVertex.x+(x+1)*sliceSize,y:originVertex.y,z:originVertex.z+(y+1)*sliceSize});
					    this.verteces.push({x:originVertex.x+x*sliceSize,y:originVertex.y,z:originVertex.z+(y+1)*sliceSize});
					    
					    this.verteces.push({x:originVertex.x+x*sliceSize,y:originVertex.y,z:originVertex.z+y*sliceSize});
					    this.verteces.push({x:originVertex.x+(x+1)*sliceSize,y:originVertex.y,z:originVertex.z+y*sliceSize});
					    this.verteces.push({x:originVertex.x+(x+1)*sliceSize,y:originVertex.y,z:originVertex.z+(y+1)*sliceSize});
				}
			}
  		} else if(face_index == 5) {
	    	const originVertex = createVector(-size/2,size/2,-size/2);
		    const sliceSize = size/(resolution-1);
		    for(let x=0; x<(resolution-1); x++) {
			    for(let y=0; y<(resolution-1); y++) {
					    this.verteces.push({x:originVertex.x+x*sliceSize,y:originVertex.y,z:originVertex.z+y*sliceSize});
					    this.verteces.push({x:originVertex.x+(x+1)*sliceSize,y:originVertex.y,z:originVertex.z+y*sliceSize});
					    this.verteces.push({x:originVertex.x+x*sliceSize,y:originVertex.y,z:originVertex.z+(y+1)*sliceSize});
					    
					    this.verteces.push({x:originVertex.x+x*sliceSize,y:originVertex.y,z:originVertex.z+(y+1)*sliceSize});
					    this.verteces.push({x:originVertex.x+(x+1)*sliceSize,y:originVertex.y,z:originVertex.z+y*sliceSize});
					    this.verteces.push({x:originVertex.x+(x+1)*sliceSize,y:originVertex.y,z:originVertex.z+(y+1)*sliceSize});
				}
			}
  		}

	}

	draw() {

	    fill(200);
	  	stroke(0);
	  	// noStroke();
	  	// normalMaterial();
		push();

	    const sliceSize = size/(resolution-1);

	    for(let i=0;i<this.verteces.length;i+=3){
	    	const vert_A = this.verteces[i];
	    	const vert_B = this.verteces[i+1];
	    	const vert_C = this.verteces[i+2];

		    beginShape();
		    vertex(vert_A.x,vert_A.y,vert_A.z);
		    vertex(vert_B.x,vert_B.y,vert_B.z);
		    vertex(vert_C.x,vert_C.y,vert_C.z);
		    endShape(CLOSE);
	    }

	    pop();

	}

}