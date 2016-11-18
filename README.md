# nesslab-reader-api.js
Node module to rfid reader nesslab. <br/>

[![NPM](https://nodei.co/npm/nesslab-reader-api.png?downloads=true&downloadRank=true)](https://nodei.co/npm/nesslab-reader-api/)

Module to make easy the communication to the h the <a href="http://www.nesslab.com/">NESSLAB</a> RFid reader.

## Tested only in NL_RF1000.
If you have another NESSLAB reader, please test it and report.

## Install
Install using NPM:
```shell
$ npm install nessslab-reader-api
```
## Usage
Require the module and connect to reader
```js
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
```
## What´s new?
Now, we are using sockets to connect directly to reader and send and receive data.
Before we used C# to connect to reader, and spawn in Node.js to listen the C# binary program. But now the Node.js code can handle the reader directly using sockets.

## Methods and Events
I am working in the [Wiki](https://github.com/jayralencar/nesslab-reader-api.js/wiki) to show you all methods and events. But you can just open the nesslab_reader.js file and see.
