var ness = require('../nesslab_reader');

ness.connect('192.168.0.100',5578);
ness.init();
ness.on('connect', function(res) {
	ness.setPower(300,function(){
		ness.getPower(function(res){
			console.log(res)
		})
	})

});