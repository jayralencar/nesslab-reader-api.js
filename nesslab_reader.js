var events = require('events');
var net = require('net');


nesslab_reader = function(){
	var self = this;
	this.socket = new net.Socket();

	this.socket.on('data', function(data){

	});

	this.socket.on('error', function(res){
		console.log("Erro:"+res)
	})

	this.socket.on('close', function(res){
		console.log(res)
	});
}

var connected = false;

nesslab_reader.prototype = new events.EventEmitter;

// Node version
nesslab_reader.prototype.nodeVersion = process.versions.node;

// socket client
// nesslab_reader.prototype.socket = new net.Socket();

// default IP Adderess
nesslab_reader.prototype.ip = '192.168.0.100';

// default tcp port
nesslab_reader.prototype.port = 5578;

//Methods
nesslab_reader.prototype.connect = function(ip, port, callback){
	if(typeof ip == 'function'){
		callback = ip;
		ip = this.ip;
	}
	if(typeof port == 'function'){
		callback = port;
		port = this.port;
	}

	ip = ip || this.ip;
	port = port || this.port;
	this.socket = net.connect(port, ip, function(res){

	}, function(res){
		console.log("Erro:"+res)
	});
}

nesslab_reader.prototype.init = function(){
	this.socket.write(new Buffer([62,102,13,10]));
}

nesslab_reader.prototype.stop = function(){
	
}

nesslab_reader.prototype.enableAntenna = function(antennaport){
	
}

nesslab_reader.prototype.disableAntenna = function(antennaport){
	
}

nesslab_reader.prototype.setPowerAntenna = function(antennaport, power){
	
}

nesslab_reader.prototype.getAntennaState = function(){
	
}

nesslab_reader.prototype.getPower = function(){
	
}

nesslab_reader.prototype.reconnect = function(){
	
}

nesslab_reader.prototype.disconnect = function(){
	
}

nesslab_reader.prototype.close = function(){
	
}



// util.inherits(nesslab_reader, EventEmitter);
module.exports = new nesslab_reader();
