var ness = require('../nesslab_reader');
ness.connect('192.168.0.100',5578, function() {
});

<<<<<<< HEAD
ness.on("connect", function(res){
	console.log('connect');
	ness.init();
})

// var net = require('net');

// var socket = net.connect(5578, '192.168.0.100', function(res){

// });

// socket.on('connect', function(res){
// 	console.log('connect');
// 	socket.write(new Buffer([62,102,13,10]));
// });

// socket.on('data', function(e){
// 	console.log(e.toString())
// })
=======
ness.connect('192.168.0.100',5578);

ness.on('connect', function(res) {
	ness.init();
	setTimeout(function(){
		ness.stop();
	},10000);
});
>>>>>>> nw
