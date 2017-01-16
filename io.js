var app = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
	console.log('connected');
	socket.emit('welcome',' Welcome to application for testing!');
	
	socket.on('message', function(msg) {
		io.emit('message', {
			message: msg
		});
	});
});

/*
 * SOcket.broadcast.emit  ----emits to everyone except to the person who emits
 * io.emit ----- emits to everyone including to person who emits
 */

module.exports = io;