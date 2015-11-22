# nesslab-reader-api.js
Node module to rfid reader nesslab

<h1>Install</h1>
<code>npm install nesslab-reader-api</code>

<h1>Usage</h1>
Require the reader api module in nodejs
<pre>
<code>
  var reader = require('nesslab-reader-api');
  
  //Connecting
  reader.connect('192.168.0.100',5578);
  
  //On connect
  reader.on('connect', function(res){
  	console.log(res);
  	//Starting reading
  	reader.init();
  });
  
  //On tag
  reader.on('tag',function(res){
    //Nmber of tag
  	console.log(res.tag);
  	//Antenna
  	console.log(res.antenna);
  	//Antena+tag
  	console.log(res.tagId);
  });
</code>
</pre>
