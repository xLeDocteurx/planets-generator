// const http = require('http')
// const https = require('https')
// let url = require("url");
// let fs = require("fs");
// let bodyparser = require("body-parser");
// let session = require("express-session");
let socket = require("socket.io");

// const EventEmitter = require("events");

let webPort = 3000;
let express = require("express");
let app = express();
let server = app.listen(process.env.PORT || webPort);
let io = socket(server);
let clients = [];
let planets = [];
let options = [];


app.set("view engine", "ejs");

// app.use(session({
//   secret: "secret",
//   resave: false,
//   saveUninitialized: true
// }))

app.use(express.static("public"/*, { dotfiles: 'allow' }*/));

app.get("/", (req, res) => {
	// const sess = req.session;

	res.render("generator", {
		// posts: data.posts
	});
});

app.get("/ar", (req, res) => {
	// const sess = req.session;

	res.render("ar", {
		// posts: data.posts
	});
});

// app.get("/ar/:id", (req, res) => {
app.post("/ar", (req, res) => {
	// const sess = req.session;

	const options = {
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

	res.render("arx", {
		options: options,
		// posts: data.posts
	});
});

io.on('connection', (socket) => {
  console.log("--- // Nouvelle connection");
  console.log("Connection ID : " + socket.id);

  clients.push(socket);
  // console.log("New connected users list : ");
  // console.log(clients);

  socket.on('updateOptions', function updateOptionsData(data) {
    //socket.emit('updateOptions', data);
    socket.broadcast.emit('updateOptions', data);
  });

  socket.on('disconnect', () => {
    console.log(socket.id + ' // Got disconnect!');
    var i = clients.indexOf(socket);

    clients.splice(i, 1);
    // console.log("New connected users list : ");
    // console.log(allClients);
  });

});

console.log("My server is running");