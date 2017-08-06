var express = require('express');
var path = require('path');
var app = express();

var http = require('http').Server(app);
var WebSocket = require('ws');

app.set('port', 3000);

app.use(express.static(path.join(__dirname,'public')));

var wss = new WebSocket.Server({port:8080});

var server = app.listen(app.get('port'), function() {
	var port = server.address().port;
	
});




