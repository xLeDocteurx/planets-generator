// let http = require('http');
// let url = require('url');

// let fs = require('fs');
// const EventEmitter = require('events');

let allClients = [];
let webPort = 3000;
let express = require('express');
let app = express();


// app.set('view engine', 'ejs');

// app.get('/', function(req, res) {
//   res.render('index', {
//     posts: data.posts
//   });
// });

app.use(express.static('public'));

let server = app.listen(process.env.PORT || webPort);

console.log('My server is running');