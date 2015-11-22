var spawn = require('child_process').spawn;
var leitor = spawn(__dirname+'/Leitor.exe', []);
var util = require('util');
var events = require('events');


nesslab_reader = function(){
	var self = this;
}

var connected = false;


nesslab_reader.prototype = new events.EventEmitter;

//Methods
nesslab_reader.prototype.connect = function(ip, port){
	leitor.stdin.write('connect\r\n');
	leitor.stdin.write(ip+'\r\n'+port+'\r\n');
	return this;
}

nesslab_reader.prototype.init = function(){
	leitor.stdin.write('init\r\n');
}

nesslab_reader.prototype.stop = function(){
	leitor.stdin.write('init\r\n');	
}

nesslab_reader.prototype.enableAntenna = function(antennaport){
	leitor.stdin.write('setAntennaState\r\n');
	leitor.stdin.write(antennaport+'\r\n');
	leitor.stdin.write('1\r\n');
}

nesslab_reader.prototype.disableAntenna = function(antennaport){
	leitor.stdin.write('setAntennaState\r\n');
	leitor.stdin.write(antennaport+'\r\n');
	leitor.stdin.write('0\r\n');
}

nesslab_reader.prototype.setPowerAntenna = function(antennaport, power){
	leitor.stdin.write('setAntennaPower\r\n');
	leitor.stdin.write(antennaport+'\r\n');
	leitor.stdin.write(power+'\r\n');
}

nesslab_reader.prototype.getAntennaState = function(){
	leitor.stdin.write('getAntennaState\r\n');
}

nesslab_reader.prototype.getPower = function(){
	leitor.stdin.write('getPower\r\n');	
}

nesslab_reader.prototype.reconnect = function(){
	leitor.stdin.write('reconnect\r\n');		
}

nesslab_reader.prototype.disconnect = function(){
	leitor.stdin.write('disconnect\r\n');		
}

nesslab_reader.prototype.close = function(){
	leitor.stdin.write('exit\r\n');	
}

leitor.stdout.on('data', function (data) {
	var reader = new nesslab_reader();
	var comando = data.toString();
	var comandos = comando.split("|");
	switch(comandos[0]){
		case 'tag':
			var tag = comandos[1];
			var result = {
				tag: tag.substring(2,30),
				antenna: tag.substring(0,1),
				tagId: tag 
			}
			reader.emit('tag', result);
			break;
		case 'waiting': 
			reader.emit('waiting',"waiting for "+comandos[1]);
			break;
		case 'connected':
			reader.emit('connect','Im connected with the reader');
			break;
		case 'initread':
			reader.emit('init','Reading was initiated');
			break;
		case 'disconnected':
			reader.emit('disconnected',comandos[1]);
			console.log(comandos[1]);
			break;
		case 'timeout':
			reader.emit('disconnected',comandos[1]);
			console.log(comandos[1]);
			break;
		case 'antennastate':
			var number = parseInt(comandos[1]);
			var port1 = (number & 0x0001) > 0;
            var port2 = (number & 0x0002) > 0;
            var port3 = (number & 0x0004) > 0;
            var port4 = (number & 0x0008) > 0;

            reader.emit('stateport1',port1);
            reader.emit('stateport2',port2);
            reader.emit('stateport3',port3);
            reader.emit('stateport4',port4);

            break;

        case 'antennapower':
        	reader.emit('antennapower',comandos[1]);

	}
	// console.log('stdout: ' + data);
});

// util.inherits(nesslab_reader, EventEmitter);
module.exports = new nesslab_reader();
