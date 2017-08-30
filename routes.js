var passport = require('passport');
var Account = require('./models/account');
var ioclient = require("socket.io-client");


module.exports = function(app, server, ioserver){

   
    app.get('/', function(req, res){
        
        
        res.render('index.ejs', {user:req.user});
    });

    app.get('/register', function(req, res){
        res.render('register.ejs', {});
    });

    app.post('/register', function(req, res){
        Account.register(new Account({username:req.body.username, email:req.body.email}), req.body.password, function(err, account){
            if(err){
                return res.render('register.ejs', {account:account});
            }

            passport.authenticate('local')(req, res, function(){
                res.redirect('/');
            });

        });
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { user : req.user });
    });
  
    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    });
  
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
  
    app.get('/ping', function(req, res){
        res.send("pong!", 200);
    });

    

}