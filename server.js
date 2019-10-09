// const http = require("http")
// const https = require("https")
// let url = require("url");
// let fs = require("fs");
const bodyparser = require("body-parser");
// let session = require("express-session");

// const EventEmitter = require("events");

const webPort = 3000;

const express = require("express");
const app = express();
// const app = require("express")();
const server = app.listen(process.env.PORT || webPort);
// const server = require("http").createServer(app);
// server.listen(process.env.PORT || webPort);
// let socket = require("socket.io");
// let io = socket(server);
const io = require("socket.io")(server);
// const io_emitter = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });

let rooms = [];
let clients = [];
let planets = [];
let options = [];


app.set("view engine", "ejs");

//utilisation body-parser pour recuperer les données venant du client
app.use(bodyparser.urlencoded({
  extended: false
}));

// //Utilisation des session en express
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }))

app.use(express.static("public"/*, { dotfiles: "allow" }*/));

app.get("/", (req, res) => {
	// const sess = req.session;

	res.render("generator", {
		// datas: datas,
	});
});

app.get("/ar", (req, res) => {
	// const sess = req.session;

	res.render("ar", {
		// datas: datas,
	});
});

// app.get("/ar/:id", (req, res) => {
app.post("/ar", (req, res) => {
	// const session = req.session;
	// console.log("Session : ", session);

	// console.log("Req : ", req);

	const roomId = req.body.id;

	res.render("arx", {
		roomId: roomId,
	});
});

io.on("connection", (client) => {
	console.log(client.id + " // Connected !");

	clients.push(client);
	rooms.push(client.id);

	// console.log("New connected users list : ", allClients);
	// console.log("New rooms list : ", allClients);
		
	// // sending to the client
	// client.emit("hello", "can you hear me?", 1, 2, "abc");

	// // sending to all clients except sender
	// client.broadcast.emit("broadcast", "hello friends!");
	
	client.on("disconnect", (reason) => {
		console.log(client.id + " // Got disconnect ! // reason : " + reason);
		const clientI = clients.indexOf(client);
		clients.splice(clientI, 1);
		const roomI = clients.indexOf(client);
		rooms.splice(roomI, 1);
		// console.log("New connected users list : ", allClients);
		// console.log("New rooms list : ", allClients);
	});	

	client.on("error", (error) => {
		console.log("Error : ", error);
	});

	client.on("updateOptions", (options) => {
		//client.emit("updateOptions", options);
		client.to(client.id).broadcast.emit("updateOptions", options);
	});

	client.on("joinARoom", (roomId) => {
		console.log("Client wants to join room : ", roomId);
		if(rooms.includes(roomId)){
			client.join(roomId);
		} else {
			client.emit("socketError", "This room does not exist");
		}
	});

});

console.log("My server is running");