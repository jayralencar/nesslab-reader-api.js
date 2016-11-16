var events = require('events');
var net = require('net');

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
	})
}

nesslab_reader.prototype = new events.EventEmitter;

nesslab_reader.prototype.socket = net.Socket();

nesslab_reader.prototype.action;

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

nesslab_reader.prototype.getBuzzer = function(callback){
	this.socket.write(new Buffer([62,121,32,98,13,10]));
	this.on('buzzer', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getContinueMode = function(callback){
	this.socket.write(new Buffer([62,121,32,99,13,10]));
	this.on('continueMode', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getAlgorithmParameter = function(algorithm, index, callback){
	this.socket.write(new Buffer([62,121,32,81,32,algorithm.toString(),index.toString(),13,10 ]));
	this.on('algorithmParameter', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getQValue = function(callback){
	this.socket.write(new Buffer([62,121,32,113,13,10]));
	this.on('Qvalue', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getSession = function(callback){
	this.socket.write(new Buffer([62,121,32,115,13,10]));
	this.on('session', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getIpAddress = function(callback){
	this.socket.write(new Buffer([62,121,32,114,13,10]));
	this.on('ipAddress', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getWritePort = function(callback){
	this.action = 'getWritePort';
	this.socket.write(new Buffer([62,121,32,50,13,10]));
	this.on('writePort', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getSelectMask = function(callback){
	this.socket.write(new Buffer([62,121,32,109,13,10]));
	this.on('selectMask', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getSelectAction = function(callback){
	this.socket.write(new Buffer([62,121,32,103,13,10]));
	this.on('selectAction', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getTagInformations = function(callback){
	this.socket.write(new Buffer([62,121,32,121,13,10]));
	this.on('tagInformations', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getVersion = function(type,callback){
	this.socket.write(new Buffer([62,121,32,118,32,type.toString,13,10]));
	this.on('version', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getInventoryTime = function(callback){
	this.socket.write(new Buffer([62,121,32,116,13,10]));
	this.on('inventoryTime', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getOperationMode = function(callback){
	this.socket.write(new Buffer([62,121,32,120,13,10]));
	this.on('operationMode', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getFrequencyBand = function(callback){
	this.socket.write(new Buffer([62,121,32,70,13,10]));
	this.on('freqeuncyBand', function(data){
		if(callback){
			callback(data)
		}
	});
}	

nesslab_reader.prototype.getFhss = function(callback){
	this.socket.write(new Buffer([62,121,32,111,13,10]));
	this.on('fhss', function(data){
		if(callback){
			callback(data)
		}
	});
}

nesslab_reader.prototype.getChannelNumber = function(callback){
	this.socket.write(new Buffer([62,121,32,110,13,10]));
	this.on('channelNumber', function(data){
		if(callback){
			callback(data)
		}
	});
}

/* ===================== SETS ===================== */
nesslab_reader.prototype.setBuzzer = function(bool){
	this.socket.write(new Buffer([62, 120, 32,98,32, (bool?49:48)  ,13,10]));
}

nesslab_reader.prototype.enableAntenna = function(antennaport){
	
}

nesslab_reader.prototype.disableAntenna = function(antennaport){
	
}

nesslab_reader.prototype.setPowerAntenna = function(antennaport, power){
	
}

nesslab_reader.prototype.getAntennaState = function(callback){
	this.socket.write(new Buffer([62,121,32,101,13,10]));
	this.on('antennaState', function(data){
		if(callback){
			callback(data)
		}
	});
}

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
}

nesslab_reader.prototype.reconnect = function(){
	
}

nesslab_reader.prototype.disconnect = function(){
	
}

nesslab_reader.prototype.close = function(){
	
}



// util.inherits(nesslab_reader, EventEmitter);
module.exports = new nesslab_reader();
