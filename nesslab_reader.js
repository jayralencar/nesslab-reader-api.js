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
* requires
*/
var events = require('events');
var net = require('net');

/**
* class nesslab_reader
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader = function(){
	var self = this;

	/**
	* When the sockect is successful connected
	*/
	this.socket.on('connect', function(res){
		self.emit('connect',"The reader is connected");
	});

	/**
	* When the socket returns any data
	*/
	this.socket.on('data', function(data){
		var dataStr = data.toString();
		var type = dataStr.substring(0,2);
		console.log(dataStr);

		switch(type){
			case '>b':
				self.emit('buzzer',parseInt(dataStr.substring(2)));
				break;
			case '>c':
				self.emit('continueMode',parseInt(dataStr.substring(2)));
				break;
			case '>e':
				self.emit('antennaState', parseInt(dataStr.substring(2)));
				break;
			case '>F':
				self.emit('freqeuncyBand', dataStr.substring(2));
				break;
			case '>g':
				self.emit('selectAction',dataStr.substring(2));
				break;	
			case '>p':
				self.emit('power',{port:0,value:parseInt(dataStr.substring(2))});
				break;
			
			
			case '>q':
				self.emit('Qvalue',parseInt(dataStr.substring(2)));
				break;
			case '>Q':
				self.emit('algorithmParameter',parseInt(dataStr.substring(2)));
				break;
			case '>%':
				self.emit('power',{port:parseInt(dataStr.substring(2,4)),value:parseInt(dataStr.substring(5))});
			case '>s':
				self.emit('algorithmParameter',(dataStr.substring(2)));
				break;	
			case '>r':
				self.emit('ipAddress',dataStr.substring(4));
				break;
			case '>m':
				self.emit('selectMask',dataStr.substring(2));
				break;
			
			case '>y': 
				self.emit('tagInformations',dataStr.substring(2));
				break;
			case '>v':
				self.emit('version',dataStr.substring(2));
				break;
			case '>t':
				self.emit('inventoryTime',parseInt(dataStr.substring(2)));
				break;
			case '>x':
				self.emit('operationMode', dataStr.substring(2));
				break;
			case '>o':
				self.emit('fhss', dataStr.substring(2));
				break;
			case '>n':
				self.emit('channelNumber', parseInt(dataStr.substring(2)));
				break;
			default: 
				switch(self.action){
					case 'getWritePort':
						self.emit('writePort',parseInt(dataStr.substring(1)));	
						self.action = null;
						break;
				}
		}
	});
}

/**
* Inheriting node's event emitter
*/
nesslab_reader.prototype = new events.EventEmitter;

/**
* Defining socket client
*/
nesslab_reader.prototype.socket = net.Socket();

/**
* action that the reade is executing - This is used if the reponse is not identified
*/
nesslab_reader.prototype.action;

/**
* node version of the current machine
*/
nesslab_reader.prototype.nodeVersion = process.versions.node;

/**
* default IP address
*/
nesslab_reader.prototype.ip = '192.168.0.100';

/**
* default TCP port
*/
nesslab_reader.prototype.port = 5578;

/* ---------------------------------------------------
   |												 |
   | =================== METHODS =================== |
   |												 |
   ---------------------------------------------------
*/

/**
* connect to reader
* @param {String} ip
* @param {Int} port
* @param {Function} callback
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
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
	this.socket.connect(port, ip);
	return this;
}

/**
* disconnect reader - or close connection
* @param {Function} callback
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.close = function(callback){
	this.socket.destroy();
	return this;
}

/**
* start reading tags
* return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.init = function(){
	this.socket.write(new Buffer([62,102,13,10]));
	return this;
}

/**
* stop reading tags
* return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.stop = function(){
	this.socket.write(new Buffer([62,51,13,10]));
	return this;
}

/**
* enable antenna
* @param {Int} antennaport
* @param {Function} callback
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.enableAntenna = function(antennaport, callback){
	return this;
}

/**
* disable antenna
* @param {Int} antennaport
* @param {Function} callback
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.disableAntenna = function(antennaport, callback){
	return this;
}

/* ---------------------------------------------------
   |												 |
   | ===================== GETS ==================== |
   |												 |
   ---------------------------------------------------
*/

/**
* get buzzer enable value
* @param {Function} callback
* @callback {Int|Bool} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getBuzzer = function(callback){
	this.socket.write(new Buffer([62,121,32,98,13,10]));
	this.on('buzzer', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get continue mode
* @param {Function} callback
* @callback {Int} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getContinueMode = function(callback){
	this.socket.write(new Buffer([62,121,32,99,13,10]));
	this.on('continueMode', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get algorithm parameter
* @param {Int} algorithm
* @param {Int} index
* @param {Function} callback
* @callback {String} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getAlgorithmParameter = function(algorithm, index, callback){
	this.socket.write(new Buffer([62,121,32,81,32,algorithm.toString(),index.toString(),13,10 ]));
	this.on('algorithmParameter', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get Q value
* @param {Function} callback
* @callback {Int} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getQValue = function(callback){
	this.socket.write(new Buffer([62,121,32,113,13,10]));
	this.on('Qvalue', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get Session
* @param {Function} callback
* @callback {Int} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getSession = function(callback){
	this.socket.write(new Buffer([62,121,32,115,13,10]));
	this.on('session', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get IP Address
* @param {Function} callback
* @callback {String} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getIpAddress = function(callback){
	this.socket.write(new Buffer([62,121,32,114,13,10]));
	this.on('ipAddress', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get Write Port
* @param {Function} callback
* @callback {Int} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getWritePort = function(callback){
	this.action = 'getWritePort';
	this.socket.write(new Buffer([62,121,32,50,13,10]));
	this.on('writePort', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get Select Mask
* @param {Function} callback
* @callback {String} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getSelectMask = function(callback){
	this.socket.write(new Buffer([62,121,32,109,13,10]));
	this.on('selectMask', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}
/**
* get Select Action
* @param {Function} callback
* @callback {Int} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getSelectAction = function(callback){
	this.socket.write(new Buffer([62,121,32,103,13,10]));
	this.on('selectAction', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get Tag Informations
* @param {Function} callback
* @callback {Int} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getTagInformations = function(callback){
	this.socket.write(new Buffer([62,121,32,121,13,10]));
	this.on('tagInformations', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get Version
* @param {Int} type
* @param {Function} callback
* @callback {String} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getVersion = function(type,callback){
	this.socket.write(new Buffer([62,121,32,118,32,type.toString,13,10]));
	this.on('version', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get Inventory Time
* @param {Function} callback
* @callback {Int} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getInventoryTime = function(callback){
	this.socket.write(new Buffer([62,121,32,116,13,10]));
	this.on('inventoryTime', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get Operation Mode
* @param {Function} callback
* @callback {Int} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getOperationMode = function(callback){
	this.socket.write(new Buffer([62,121,32,120,13,10]));
	this.on('operationMode', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get Frequency Band
* @param {Function} callback
* @callback {Int} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getFrequencyBand = function(callback){
	this.socket.write(new Buffer([62,121,32,70,13,10]));
	this.on('freqeuncyBand', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}	

/**
* get FHSS
* @param {Function} callback
* @callback {Int} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getFhss = function(callback){
	this.socket.write(new Buffer([62,121,32,111,13,10]));
	this.on('fhss', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get Channel Number
* @param {Function} callback
* @callback {Int} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getChannelNumber = function(callback){
	this.socket.write(new Buffer([62,121,32,110,13,10]));
	this.on('channelNumber', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get Power - all or by antenna port
* @param {Int} port
* @param {Function} callback
* @callback {Int} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getPower = function(port, callback){
	if(port){
		if(typeof(port) == 'number'){
			var v = new Buffer([62,121,32,37,32,port.toString().charCodeAt(0),13,10])
			this.socket.write(v);
		}else{
			callback = port;
			this.socket.write(new Buffer([62,121,32,112,13,10]));
		}
	}else{
		this.socket.write(new Buffer([62,121,32,112,13,10]));
	}
	
	this.on('power', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}

/**
* get Antenna State
* @param {Function} callback
* @callback {Int} data
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.getAntennaState = function(callback){
	this.socket.write(new Buffer([62,121,32,101,13,10]));
	this.on('antennaState', function(data){
		if(callback){
			callback(data)
		}
	});
	return this;
}


/* ---------------------------------------------------
   |												 |
   | ===================== SETS ==================== |
   |												 |
   ---------------------------------------------------
*/

/**
* set buzzer enable value
* @param {Bool} bool
* @param {Function} callback
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.setBuzzer = function(bool, callback){
	this.socket.write(new Buffer([62, 120, 32,98,32, (bool?49:48)  ,13,10]));
	if(callback){
		callback();
	}
	return this;
}

/**
* set antenna's power
* @param {Int} antennaport
* @param {Int} power
* @param {Function} callback
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.setPowerAntenna = function(antennaport, power, callback){
	if(callback){
		callback();
	}
	return this;
}

/**
* exporting module
*/
module.exports = new nesslab_reader();