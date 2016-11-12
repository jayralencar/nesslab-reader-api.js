var ness = require('../nesslab_reader');

ness.connect('127.0.0.1',5578, function() {
	ness.init();
});