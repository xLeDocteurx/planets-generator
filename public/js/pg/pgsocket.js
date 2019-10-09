let socket = io.connect();

function logSocketId() {
	alert("Your room ID is : " + socket.id);
}

function updateOptions(options) {
	socket.emit("updateOptions", options);
}