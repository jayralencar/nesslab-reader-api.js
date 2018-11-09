var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('2T3000123456789012345678901234');
	socket.pipe(socket);
});

server.listen(5578, '127.0.0.1');

server.on("data", function(a){
    console.log(a)
})
