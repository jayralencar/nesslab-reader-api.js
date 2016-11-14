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

/**
* Class nesslab_reader
* @author Jayr (@jayralencar)
*/
var nesslab_reader = function(){
	var self = this;
	this.socket = new net.Socket();

	this.socket.on('data', function(data){
		console.log(data)
	});

	this.socket.on('error', function(res){
		this.emit('error',"Error to connect socket!")
	});

	this.socket.on('close', function(res){
		console.log(res)
	});

	this.socket.on('connected', function(res){
		console.log('connected');
	});
}

/**
* Events constructor inheritance
*/
nesslab_reader.prototype = new events.EventEmitter;

/**
* var nodeVersion - Getting node version in current machine
*/
nesslab_reader.prototype.nodeVersion = process.versions.node;

/**
* var ip - default IP Adderess
*/
nesslab_reader.prototype.ip = '192.168.0.100';

/**
* var port - default TCP port
*/
nesslab_reader.prototype.port = 5578;

/**
* method connect - connecting to reader
* @param {Sintrg} ip - IP Address
* @param {String|Int} port - TCP port
* @param {Function} callback - callback function
* @return {Object} this
*/
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
		this.emit('connected');
		callback();
	});
	return this;
}

/**
* method init - start reading tags
* @param {Function} callback - callback function
* @return {Object} this
*/
nesslab_reader.prototype.init = function(callback){
	this.socket.write(new Buffer([62,102,13,10]));
	if(callback){
		callback();
	}
	return this;
}

/**
* method stop - stop reading tags
* @param {Function} callback - callback function
* @return {Object} this
*/
nesslab_reader.prototype.stop = function(callback){
	if(callback){
		callback();
	}
	return this;
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

module.exports = new nesslab_reader();
