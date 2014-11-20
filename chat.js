module.exports = function() {

	var net = require('net');
	var PORT = 8000;
	var sockets = [];

	var server = net.createServer(function(socket) {
		sockets.push(socket);

		socket.on('data', function(data) {
			for (var i = 0 ; i < sockets.length; i++) {
				if(sockets[i] != socket) {
					sockets[i].write(data);
				}
			}
		});

		socket.on('end', function() {
			var i = sockets.indexOf(socket);
			sockets.splice(i, 1);
		});
	});

	server.listen(PORT, function() {
		console.log('Chat server is listening on port ' + PORT);
	});

}