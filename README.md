# nesslab-reader-api.js
Node module to rfid reader nesslab. <br/>

[![NPM](https://nodei.co/npm/nesslab-reader-api.png?downloads=true&downloadRank=true)](https://nodei.co/npm/nesslab-reader-api/)

Módulo desenvolvido para facilitar a comunicação do node.js com o leitor rfid da <a href="http://www.nesslab.com/">NESSLAB</a>, que é um dos mais acessíveis no mercado. Foi testado apenas no modelo NL_RF1000.

<h1>Instalação</h1>
O módulo foi compartilhado no npm, para instalar execute o comando a seguir no diretório do seu projeto pelo terminal.
<code>npm install nesslab-reader-api</code>

<h1>Uso</h1>
Importe o módulo com <code>require</code> como no exemplo a seguir
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
<h1>Métodos</h1>
Os métodos dizem respeito às ações da parte do usuário para o leitor. Veja:
<h3>connect(ip, port)</h3>
Método para conexão com o leitor, basta informar o ip (string) e a porta (int). Você deve usar este método antes de todos os outros.
<h3>init()</h3>
Para iniciar a leitura de tags, depois que este método é chamado o leitor, se conectado, inicia a leitura das tags.
<h3>stop()</h3>
Este método serve para pausar a leitura, que pode ser iniciada novamente com o método init
<h3>disableAntenna(antennaPort)</h3>
Este método deve ser chamado quando você deseja desabilitar uma antena, você deve passar o número da porta como parâmetro, veja o exemplo como desabilitar a antena 1:
<pre>
  <code>
    reader.disableAntenna(1);
  </code>
</pre>
<h3>enableAntenna(antennaPort)</h3>
Se você desabilitou uma antena, ou ela está desabilitada por algum outro motivo, você pode reativar com este método, basta passar por parâmetro o número da porta da antena.
<h3>setPowerAntenna(antennaPort, power)</h3>
Com este método você pode setar a potencia que você deseja para determinada antena passando por parâmetro o número da porta da antena e a potencia, veja:
<pre>
  <code>
    reader.setPowerAntenna(1,200);
  </code>
</pre>
<h3>getAntennaState()</h3>
Este método serve para retornar o status das antenas, que serão retornados nos eventos <code>stateport1, stateport2, stateport3 e stateport4</code> que veremos mais a frente.
<h3>getPower()</h3>
Você deve usar este método quando deseja saber qual a potencia atual do leitor, é só chamar o método e escutar o evento <code>antennapower</code> que veremos mais a baixo.
<h3>reconnect</h3>
Este evento vai desconectar e reconectar o leitor.
<h3>disconnect</h3>
Este método vai desconectar o leitor, e para conectar novamente você deve usar o método <code>connect</code>
<h3>close</h3>
Este método vai fechar a comunicação com o leitor

<h1>Eventos</h1>
Você usurá os eventos para tratar as informações retornadas do leitor, veja um exemplo de como usar um evento:
<pre>
  <code>
    reader.on('tag',function(res){
    	console.log(res.tag);
    });
  </code>
</pre>

<h3>tag</h3>
Este evento como o nome sugere e como mostrado acima retorna um objeto JSON com a tag lida, a antena e a string completa retornada do leitor que é formada pela antena e a tag juntas.
<pre>
  <code>
    reader.on('tag',function(res){
    	console.log(res.tagId); //Mostra 4T3000000000000000000000000295
    	console.log(res.tag); //Mostra 3000000000000000000000000295
    	console.log(res.antenna); //Mostra 4
    });
  </code>
</pre>
<h3>waiting</h3>
Este evento vai ser chamado sempre que o leitor esperar uma ação do usuário ou do módulo
<h3>connected</h3>
Quando o leitor estiver devidamente conectado este método será chamado, veja o exemplo:
<pre>
<code>
  var reader = require('nesslab-reader-api');
  
  //Connecting
  reader.connect('192.168.0.100',5578);
  
  //On connect
  reader.on('connect', function(res){
  	console.log(res); //Connected
  });
</code>
</pre>
<h3>init</h3>
Este evento é disparado quando o leitor inicia a leitura das tags.
<h3>disconnected</h3>
Este evento é chamado quando o leitor é desconectado por algum motivo, é ideal que seja sempre usado para que o usuário e o desenvolvedor saibam o que houve. Ele retorna o erro que aconteceu, use-o assim:
<pre>
<code>
  var reader = require('nesslab-reader-api');
  
  //Connecting
  reader.connect('192.168.0.100',5578);
  
  //On disconnect
  reader.on('disconnected', function(res){
  	console.log(res); //Connection error
  });
</code>
</pre>
<h3>antennapower</h3>
Este evento é acionado quando o método <code>getPower()</code> é chamado. Veja um exemplo
<pre>
  <code>
    var reader = require('nesslab-reader-api');
  
    //Connecting
    reader.connect('192.168.0.100',5578);
    
    reader.getPower();
    
    reader.on('antennapower', function(power){
      console.log(power);
    });
  </code>
</pre>
<h3>Eventos de estado</h3>
Quando o método <code>getAntennaState</code> for chamado os eventos referente ao estado de cada antena será chamado, retornando verdadeiro para as ativas e falsos para as inativas, veja a baixo:
<pre>
<code>
  var reader = require('nesslab-reader-api');
  
  //Connecting
  reader.connect('192.168.0.100',5578);
  
  //Getting states
  reader.getAntennaState();
  
  //Antenna 1
  reader.on('stateport1', function(state){
    console.log(state);
  });
  
  //Antenna 2
  reader.on('stateport2', function(state){
    console.log(state);
  });
  
  //Antenna 3
  reader.on('stateport3', function(state){
    console.log(state);
  });
  
  //Antenna 4
  reader.on('stateport4', function(state){
    console.log(state);
  });
</code>
</pre>
