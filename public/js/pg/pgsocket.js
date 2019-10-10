let socket = io.connect();

function logSocketId() {
	// alert("Your room ID is : " + socket.id);
	alert("Your room ID is : " + roomId);
}

function updateOptions(options) {
	socket.emit("updateOptions", options);
}