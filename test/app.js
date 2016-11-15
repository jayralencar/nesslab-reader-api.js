var ness = require('../nesslab_reader');

ness.connect('192.168.0.100',5578);

ness.on('connect', function(res) {
	ness.init();
	setTimeout(function(){
		ness.stop();
	},10000);
});