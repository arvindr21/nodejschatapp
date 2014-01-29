var express = require("express");
var logfmt = require("logfmt");
var connected_users={};
var app = express();
var username;
var jf = require('jsonfile')
  , util = require('util');
	app.use(logfmt.requestLogger());
	var _file = __dirname + '/data/data.json';

	app.set('views', __dirname + '/tpl');
	app.set('view engine', "jade");
	app.engine('jade', require('jade').__express);


	app.get('/', function(req, res) {
		//res.send("Hello "+(req.connection.remoteAddress)+", You are not authorized to view this page! ");	  	
		res.render("page");
	});

	app.get('/users', function(req, res) {
		jf.readFile(_file, function(err, obj) {
		  res.send(util.inspect(obj));	  
		});
	});

var port = Number(process.env.PORT || 9999);
app.use(express.static(__dirname + '/public'));


var io = require('socket.io').listen(app.listen(port)); 

io.sockets.on('connection', function (socket) {
	socket.emit('message', { message: 'welcome to the chat ', "connected_users" : connected_users });    
	socket.on('send', function (data) {
		username = data.username;
		delete connected_users[username];
        connected_users[username] = data.username;
		data.connected_users = connected_users;
		io.sockets.emit('message', data);		
		console.log("conc", connected_users, username);
    });
	socket.on('close',function(){
		console.log("disc", connected_users, username);
        delete connected_users[username];
    });
});