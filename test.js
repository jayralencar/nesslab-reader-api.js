var reader = require('./nesslab_reader');

reader.connect('192.168.0.100', 5578);
reader.on('connect', function(res){
	console.log(res);
	reader.init();
});

reader.on('init', function(res){
	console.log(res);
})

reader.on('tag', function(res){
	console.log(res.tagId);
});

reader.on('stateport4', function(res){
	console.log(res)
});

reader.on('disconnected', function(res){
  	console.log(res); //Connected
  });