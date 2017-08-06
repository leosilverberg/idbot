var app = require('express')();
var http = require('http').Server(app);
var WebSocket = require('ws');

var wss = new WebSocket.Server({port:8080});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});


http.listen(3000, function(){
	console.log("listening on *:3000");
});


