/*
The MIT License (MIT)
Copyright (c) 2015 Jayr Alencar
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**
* Requires
*/
var events = require('events');
var net = require('net');
var socket = net.Socket();

function Reader(){

	// this.socket = net.connect(port, ip);

}

nesslab_reader = function(){
	var self = this;
	this.socket.on('connect', function(res){
		self.emit('connect',"The reader is connected");
	});
	this.socket.on('data', function(data){
		var dataStr = data.toString();
		var type = dataStr.substring(0,2);
		console.log(dataStr);

		switch(type){
			case '>p':
				self.emit('power',parseInt(dataStr.substring(2)));
				break;
			case '>e':
				self.emit('antennaState', parseInt(dataStr.substring(2)));
				break;
		}
	})
}

nesslab_reader.prototype = new events.EventEmitter;

nesslab_reader.prototype.socket = net.Socket();

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
	this.socket.connect(port, ip);
}

nesslab_reader.prototype.init = function(){
	this.socket.write(new Buffer([62,102,13,10]));
}

nesslab_reader.prototype.stop = function(){
	this.socket.write(new Buffer([62,51,13,10]));
}

nesslab_reader.prototype.enableAntenna = function(antennaport){
	
}

nesslab_reader.prototype.disableAntenna = function(antennaport){
	
}
>>>>>>> nw

Reader.prototype = new events.EventEmitter;

<<<<<<< HEAD

Reader.prototype.connect = function(ip, port){
	socket.connect(port,ip);
=======
nesslab_reader.prototype.getAntennaState = function(callback){
	this.socket.write(new Buffer([62,121,32,101,13,10]));
	this.on('antennaState', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getPower = function(callback){
	this.socket.write(new Buffer([62,121,32,112,13,10]));
	this.on('power', function(data){
		if(callback){
			callback(data)
		}
	});
>>>>>>> nw
}

module.exports = new Reader();
