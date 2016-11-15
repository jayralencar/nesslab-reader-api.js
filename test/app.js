var ness = require('../nesslab_reader');

ness.connect('192.168.0.100',5578);

ness.on('connect', function(res) {
	ness.getPower(1,function(pw){
		console.log(pw)
	});
	// ness.init()
});