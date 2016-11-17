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
nesslab_reader.prototype.nodeVersion = parseFloat(process.versions.node);

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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,102,13,10]) : new Buffer([62,102,13,10]);
	this.socket.write(buf);
	return this;
}

/**
* stop reading tags
* return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.stop = function(){
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,51,13,10]) : new Buffer([62,51,13,10]);
	this.socket.write(buf);
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

/**
* suspend antenna port settings
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.suspendAntennaPortSettings = function(){
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,120,32,37,32, 57,57, 32,49 ,13,10]) : new Buffer([62,120,32,37,32, 57,57, 32,49 ,13,10]);
	this.socket.write(buf);
	return this;
}

/**
* resume antenna port settings
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.resumeAntennaPortSettings = function(){
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,120,32,37,32, 57,57, 32,48 ,13,10]) : new Buffer([62,120,32,37,32, 57,57, 32,48 ,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,98,13,10]) : new Buffer([62,121,32,98,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,99,13,10]) : new Buffer([62,121,32,99,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,81,32,algorithm.toString(),index.toString(),13,10 ]) : new Buffer([62,121,32,81,32,algorithm.toString(),index.toString(),13,10 ]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,113,13,10]) : new Buffer([62,121,32,113,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,115,13,10]) : new Buffer([62,121,32,115,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,114,13,10]) : new Buffer([62,121,32,114,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,50,13,10]) : new Buffer([62,121,32,50,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,109,13,10]) : new Buffer([62,121,32,109,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,103,13,10]) : new Buffer([62,121,32,103,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,121,13,10]) : new Buffer([62,121,32,121,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,118,32,type.toString,13,10]) : new Buffer([62,121,32,118,32,type.toString,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,116,13,10]) : new Buffer([62,121,32,116,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,120,13,10]) : new Buffer([62,121,32,120,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,70,13,10]) : new Buffer([62,121,32,70,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,111,13,10]) : new Buffer([62,121,32,111,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,110,13,10]) : new Buffer([62,121,32,110,13,10]);
	this.socket.write(buf);
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
			var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,37,32,port.toString().charCodeAt(0),13,10]) : new Buffer([62,121,32,37,32,port.toString().charCodeAt(0),13,10]);
		}else{
			callback = port;
			var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,112,13,10]) : new Buffer([62,121,32,112,13,10]);
		}
	}else{
		var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,112,13,10]) : new Buffer([62,121,32,112,13,10]);
	}
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,121,32,101,13,10]) : new Buffer([62,121,32,101,13,10]);
	this.socket.write(buf);
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
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62, 120, 32,98,32, (bool?49:48)  ,13,10]) : new Buffer([62, 120, 32,98,32, (bool?49:48)  ,13,10]);
	this.socket.write(buf);
	if(callback){
		callback();
	}
	return this;
}

/**
* set continue mode
* @param {Bool} bool
* @param {Function} callback
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.setContinueMode = function(bool, callback){
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62, 120, 32,99,32, (bool?49:48)  ,13,10]) : new Buffer([62, 120, 32,99,32, (bool?49:48)  ,13,10]);
	this.socket.write(buf);
	if(callback){
		callback();
	}
	return this;
}

/**
* set Q Value
* @param {Int} value
* @param {Function} callback
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.setQvalue = function(value, callback){
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62, 120 ,32,113,32,value.toString(),13,10]) : new Buffer([62, 120 ,32,113,32,value.toString(),13,10]);
	this.socket.write(buf);
	if(callback){
		callback();
	}
	return this;
}

/**
* set Algorithm Parameter
* @param {Int} algorithm
* @param {Int} index
* @param {Int} value
* @param {Function} callback
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.setAlgorithmParameter = function(algorithm,index,value, callback){
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62, 120,32,81,32, algorithm.toString(),index.toString(),32,value.toString() ,13,10]) : new Buffer([62, 120,32,81,32, algorithm.toString(),index.toString(),32,value.toString() ,13,10]);
	this.socket.write(buf);
	if(callback){
		callback();
	}
	return this;
}

/**
* set Antenna State
* @param {Int} value
* @param {Function} callback
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.setAntennaState = function(value, callback){
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62, 120 ,32,101,32,value.toString(),13,10]) : new Buffer([62, 120 ,32,101,32,value.toString(),13,10]);
	this.socket.write(buf);
	if(callback){
		callback();
	}
	return this;
}

/**
* set Power
* @param {Int} value
* @param {Function} callback
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.setPower = function(port, value, callback){

	if(value){
		if(typeof(value) == 'function'){
			callback = value;
			value = port;
			port = null;
		}
	}else{
		value = port;
		port = null;
	}

	if(port){
		var buf = this.nodeVersion >= 5.10 ? Buffer.alloc(13) : new Buffer(13);
		var init = [62,120,32,37,32,48,port.toString().charCodeAt(0),32];
	}else{
		var buf = this.nodeVersion >= 5.10 ? Buffer.alloc(10) : new Buffer(10);
		var init = [62,120,32,112,32];
	}

	for(i = 0 ; i < init.length ; i++){
		buf[i] = init[i];
	}

	var str = value.toString();

	var diff = 3 - str.length;

	for(var j = 0 ; j < diff; j++){
		str = '0'+str;
	}

	for(var i = 0 ; i<str.length;i++){
		buf[i+init.length] = str.charCodeAt(i);
	}

	buf[init.length+str.length+1] = 13;
	buf[init.length+str.length+2] = 10;

	this.socket.write(buf);
	if(callback){
		callback();
	}
	return this;
}

/**
* set session
* @param {Int} value
* @param {Int} session
* @param {Int} target
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.setSession = function(value, session, target){
	var arr = [62,120,32,115,32,value.toString().charCodeAt(0)];

	if(session){
		arr.push(32);
		arr.push(session.toString().charCodeAt(0));
		arr.push(32);
		arr.push(target.toString().charCodeAt(0));
	}

	arr.push(13);
	arr.push(10);

	var buf = this.nodeVersion >= 5.10 ? Buffer.from(arr) : new Buffer(arr);
	this.socket.write(buf);
	return this;
}

/**
* set IP Address
* @param {String} ip
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.setIpAddress = function(ip){
	var arr = [62,120,32,114,32];

	for(var i = 0 ; i < ip.length; i++){
		arr.push(ip.charCodeAt(i));
	}

	arr.push(13);
	arr.push(10);

	var buf = this.nodeVersion >= 5.10 ? Buffer.from(arr) : new Buffer(arr);
	this.socket.write(buf);
	return this;
}

/**
* set write port
* @param {Int} port
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.setWritePort = function(port){
	var buf = this.nodeVersion >= 5.10 ? Buffer.from([62,120,32,50,32,port.toString(),13,10]) : new Buffer([62,120,32,50,32,port.toString(),13,10]);
	this.socket.write(buf);
	return this;
}

/**
* set select mask
* @param {Int} bank
* @param {Int} offset
* @param {Int} count
* @param {String} mask
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/
nesslab_reader.prototype.setSelectMask = function(bank, offset, count, mask){
	var buf = this.nodeVersion>=5.10? Buffer.from('>x m '+bank+' '+offset+' '+count+' '+mask+'\r\n') : new Buffer('>x m '+bank+' '+offset+' '+count+' '+mask+'\r\n');
	this.socket.write(buf);
	return this;
}

/**
* set select action
* @param {Int} target
* @param {Int} action
* @param {Int} truncate
* @return {Object} this
* @author Jayr Alencar (@jayralencar)
*/

nesslab_reader.prototype.setSelectAction = function(target, action, truncate){
	var buf = this.nodeVersion>=5.10? Buffer.from('>x g '+target+' '+action+' '+truncate+'\r\n') : new Buffer('>x g '+target+' '+action+' '+truncate+'\r\n');
	this.socket.write(buf);
	return this;
}

/**
* exporting module
*/
module.exports = new nesslab_reader();