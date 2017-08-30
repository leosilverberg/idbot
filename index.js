
//express
var express = require('express');
var app = express();
var path = require('path');

//mongodb
var db_url = "mongodb://admin:admin@ds161833.mlab.com:61833/idbot";
var mongojs = require('mongojs');
var userdb = mongojs(db_url, ['users']);


var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

// app settings
app.set('port', process.env.port || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser('secret'));
app.use(expressSession());
app.use(express.static(path. join(__dirname, 'public')));


//start express server
var server = app.listen(3000, function(){
  console.log("listening at 3000");
})


//ioserver
var ioserver = require("socket.io")(server);

ioserver.on('connection', function(client) {
  console.log("connected: ");

  client.on('disconnect', function(){
    console.log('Client disconnected.');
  });


  client.on('message', function(data) {
    
    console.log(data);
   
  });

 });


 //routes
app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/login', function(req,res){
  res.render('login.ejs');
})

    