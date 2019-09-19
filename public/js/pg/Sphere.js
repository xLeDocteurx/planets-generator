class Sphere {

	constructor(squared = false) {
		this.squared = squared;
		this.farestVertex = null;
	}

	draw(size, resolution){

	    fill(200);
	  	stroke(0);
	  	// noStroke();
	  	// normalMaterial();
		push();

	    // var _ellipsoid = function _ellipsoid() {
	    //     for (var i = 0; i <= this.detailY; i++) {
	    //       var v = i / this.detailY;
	    //       var phi = Math.PI * v - Math.PI / 2;
	    //       var cosPhi = Math.cos(phi);
	    //       var sinPhi = Math.sin(phi);

	    //       for (var j = 0; j <= this.detailX; j++) {
	    //         var u = j / this.detailX;
	    //         var theta = 2 * Math.PI * u;
	    //         var cosTheta = Math.cos(theta);
	    //         var sinTheta = Math.sin(theta);
	    //         var p = new p5.Vector(cosPhi * sinTheta, sinPhi, cosPhi * cosTheta);
	    //         this.vertices.push(p);
	    //         this.vertexNormals.push(p);
	    //         this.uvs.push(u, v);
	    //       }
	    //     }
	    // };

	    const sliceSize = size/(resolution-1);
	    for(let x=0; x<(resolution-1); x++) {
		    for(let y=0; y<(resolution-1); y++) {
		    	if(this.squared == true){
				    beginShape(POINTS);
				    vertex(-size/2+x*sliceSize,-size/2+y*sliceSize,0);
				    vertex(-size/2+(x+1)*sliceSize,-size/2+y*sliceSize,0);
				    vertex(-size/2+(x+1)*sliceSize,-size/2+(y+1)*sliceSize,0);
				    vertex(-size/2+x*sliceSize,-size/2+(y+1)*sliceSize,0);
				    endShape();
		    	} else {
				    beginShape();
				    vertex(x*sliceSize,y*sliceSize,0);
				    vertex((x+1)*sliceSize,(y+1)*sliceSize,0);
				    vertex(x*sliceSize,(y+1)*sliceSize,0);
				    endShape(CLOSE);
				    
				    beginShape();
				    vertex(x*sliceSize,y*sliceSize,0);
				    vertex((x+1)*sliceSize,y*sliceSize,0);
				    vertex((x+1)*sliceSize,(y+1)*sliceSize,0);
				    endShape(CLOSE);
		    	}

			}
		}

	    pop();

		// console.log(
		// 	"Distance from center to farest Sphere edge : ", 
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

}