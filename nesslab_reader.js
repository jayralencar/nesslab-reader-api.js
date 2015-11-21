var spawn = require('child_process').spawn;
var leitor = spawn(__dirname+'/Leitor.exe', []);
var util = require('util');
var events = require('events');

nesslab_reader = function(){
	var self = this;
}

nesslab_reader.prototype = new events.EventEmitter;

//Methosd
nesslab_reader.prototype.connect = function(ip, port){
	leitor.stdin.write('connect\r\n');
	leitor.stdin.write(ip+'\r\n'+port+'\r\n');
	return this;
}

leitor.stdout.on('data', function (data) {
	var reader = new nesslab_reader();
	var comando = data.toString();
	var comandos = comando.split("|");
	switch(comandos[0]){
		case 'waiting': 
			reader.emit('waiting',"waiting for "+comandos[1]);
		case 'disconnected':
	}
	// console.log('stdout: ' + data);
});


nesslab_reader.prototype.coisa = function(){
	console.log("Coisa");
}
// util.inherits(nesslab_reader, EventEmitter);
module.exports = new nesslab_reader();
