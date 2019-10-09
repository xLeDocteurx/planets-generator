let socket = io.connect();

function logSocketId() {
	alert("Your room ID is : " + socket.id);
}

// socket.on('mouse', newDrawing);
// socket.on('refresh', refresh);

// function newDrawing(data) {

// }

// function send_refresh() {
//     socket.emit('refresh');
// }

// function refresh() {

// }