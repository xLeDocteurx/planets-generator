let socket = io.connect();

function logSocketId() {
	alert("Your room ID is : " + socket.id);
	// alert("Your room ID is : " + roomId);
}

function returnSocketId() {
	return socket.id;
}

function updateOptions(options) {
	console.log("I am transmiting these options : ", options)
	socket.emit("updateOptions", options);
}