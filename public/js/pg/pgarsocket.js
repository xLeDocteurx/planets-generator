let options = {
	space: {
		ambientLight: 0.0,
		// ambientLight: 1.0,
		directionnalLight: 0.3,
		// pointLights: 1.0,
		pointLights: 0.005,
	},
	planete: {
		size: 1,
		resolution: 24,
		// resolution: 8,
		showWater: true,
		// showWater: false,
		// abyssesLevel: 0.40,
		abyssesLevel: 0.33,
		// waterLevel: 0.56,
		waterLevel: 0.50,
		groundLevel: 1,
		// waterLevel: 1,
	},
	noise_beta: {
		seed: "seed",
		// scale: 0.12,
		offset: 300,
		scale: 0.15,
		// scale: 0.015,
		octave: 4,
		// octave: 1,
		falloff: 0.5,
		// falloff: 1,
		// strength: 0.25,
		// strength: 1,
		strength: 0.4,
	},
};

let socket = io.connect();
socket.on("socketError", receivedSocketError);
// socket.on("mouse", newDrawing);
// socket.on("refresh", refresh);

console.log("pgarsocket roomId : ", roomId);
socket.emit("joinARoom", roomId);

function receivedSocketError(errorMessage){
	alert(errorMessage);
}

// function newDrawing(datas) {

// }

// function send_refresh() {
//     socket.emit("refresh");
// }

// function refresh() {

// }