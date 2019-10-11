// const http = require("http")
// const https = require("https")
// let url = require("url");
// let fs = require("fs");
const bodyparser = require("body-parser");

const webPort = 3000;

const express = require("express");
const app = express();
// const app = require("express")();
// let session = require("express-session");
const server = app.listen(process.env.PORT || webPort);
// const server = require("http").createServer(app);
// server.listen(process.env.PORT || webPort);
// let socket = require("socket.io");
// let io = socket(server);
const io = require("socket.io")(server);
// io.engine.generateId = (req) => {
// 	return clients.length < 1 ? 0 : clients[clients.length - 1].id + 1;
// }

// const io_emitter = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });
// const EventEmitter = require("events");

let rooms = [];
let clients = [];
let planets = [];
let options = [];


app.set("view engine", "ejs");

// function requireHTTPS(req, res, next) {
//   // The 'x-forwarded-proto' check is for Heroku
//   if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
//     return res.redirect('https://' + req.get('host') + req.url);
//   }
//   next();
// }
// app.use(requireHTTPS);

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
// app.use(express.static("/*", "public"/*, { dotfiles: "allow" }*/));
app.use("/ar/:roomId", express.static("public"/*, { dotfiles: "allow" }*/));

app.get("/", (req, res) => {
	// const sess = req.session;

	res.render("generator", {
		// datas: datas,
	});
});

app.get("/ar", (req, res) => {

	res.render("ar", {
		// datas: datas,
	});
});

app.post("/ar", (req, res) => {
	// const session = req.session;
	// console.log("Session : ", session);

	// console.log("Req : ", req);

	const roomId = req.body.id;

	res.render("arx", {
		roomId: roomId,
	});
});

app.get("/ar/:roomId", (req, res) => {
	// const session = req.session;
	// console.log("Session : ", session);

	// console.log("Req : ", req);

  	// const id = htmlspecialchars(req.params.id);
  	const roomId = req.params.roomId;

	res.render("arx", {
		roomId: roomId,
	});
});

io.on("connection", (client) => {
	console.log(client.id + " // Connected !");

	clients.push(client);
	rooms.push(client.id);

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
		// console.log("The room " + client.id + " is updating options");
		clients[client.id].lastOptions = options;
		client.to(client.id).broadcast.emit("updateOptions", options);
	});

	client.on("joinARoom", (roomId) => {
		// console.log("Client wants to join room : ", roomId);
		if(rooms.includes(roomId)){
			// console.log("The room does exist");
			client.join(roomId);
			client.to(client.id).broadcast.emit("updateOptions", clients[roomId].lastOptions);
		} else {
			// console.log("The room does not exist");
			client.emit("socketError", "This room does not exist");
		}
	});

});

console.log("My server is running");