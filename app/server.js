


 
var xml = "<entry>"+
	+ "<node></node>" // незнаю пока почему парсер игнорирует первій елемент
	+ "<node type='Device' id='2' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Group' id='3' caption='Soft1'>"
		+ "<subitem name='Node.16'></subitem>"
		+ "<subitem name='Node.13' /></node>"
	+ "<node type='Device' id='4' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Group' id='5' caption='Soft2'>"
		+ "<subitem name='Node.21'></subitem>"
		+ "<subitem name='Node.9' /></node>"
	+ "<node type='Device' id='6' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='7' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='8' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Group' id='9' caption='Soft3'>"
		+ "<subitem name='Node.15'></subitem>"
		+ "<subitem name='Node.32'></subitem>"
		+ "<subitem name='Node.18' /></node>"
	+ "<node type='Device' id='10' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='11' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='12' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='13' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='14' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='15' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	
	+ "<node type='Device' id='16' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='17' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='18' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='19' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='20' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='21' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	
		+ "<node type='Device' id='27' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='28' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='29' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Group' id='27' caption='Soft1'>"
		+ "<subitem name='Node.12'></subitem>"
		+ "<subitem name='Node.28'></subitem>"
		+ "<subitem name='Node.37'></subitem>"
		+ "<subitem name='Node.40'></subitem>"
		+ "<subitem name='Node.41'></subitem>"
		+ "<subitem name='Node.42'></subitem>"
		+ "<subitem name='Node.43'></subitem>"
		+ "<subitem name='Node.44'></subitem>"
		+ "<subitem name='Node.45'></subitem>"
		+ "<subitem name='Node.46'></subitem>"
		+ "<subitem name='Node.47'></subitem>"
		+ "<subitem name='Node.14' /></node>"
	+ "<node type='Device' id='30' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='31' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Group' id='32' caption='Sofffft4'>"
		+ "<subitem name='Node.30'></subitem>"
		+ "<subitem name='Node.31' /></node>"
	+ "<node type='Group' id='37' caption='Додатково'>"
		+ "<subitem name='Node.10'></subitem>"
		+ "<subitem name='Node.11'></subitem>"
		+ "<subitem name='Node.17'></subitem>"
		
		+ "<subitem name='Node.48'></subitem>"
		+ "<subitem name='Node.49'></subitem>"
		+ "<subitem name='Node.50'></subitem>"
		+ "<subitem name='Node.51'></subitem>"
		+ "<subitem name='Node.52'></subitem>"
		+ "<subitem name='Node.53'></subitem>"
		+ "<subitem name='Node.54'></subitem>"
		+ "<subitem name='Node.55'></subitem>"
		+ "<subitem name='Node.56'></subitem>"
		+ "<subitem name='Node.57'></subitem>"
		
		+ "<subitem name='Node.19' /></node>"
		+ "<node type='Device' id='40' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='41' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='42' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='43' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='44' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='45' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='46' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='47' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='48' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='49' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='50' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='51' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='52' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='53' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='54' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='55' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='56' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='57' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='58' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='59' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='60' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='61' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='62' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='63' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='64' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='65' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='66' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='67' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='68' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='69' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='70' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='71' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='72' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='73' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='74' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='75' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='76' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='77' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		
		+ "<node type='Device' id='78' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='79' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='80' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='81' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='82' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='83' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='84' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='85' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='86' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='87' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='88' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='89' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='90' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='91' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='92' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='93' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
		+ "<node type='Device' id='94' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "</entry>";
	

var parseString = require('xml2js').parseString;
var nodes;
var fs = require('fs');

//---------------парсинг xml--------------
var pars_opts = {
	attrkey: 'attrib',
	charkey: 'char',
	explicitRoot:false
};
parseString(xml, pars_opts,
function (err, result) {
	nodes = result;
    console.dir(JSON.stringify(result));
});



//------------создаем http сервер-------------------
var express = require('express');

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))
.use(function (req, res, next) {
	//--------настройки cors---------------
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
.use(bodyParser.json()); //--------важно----

var port = process.env.PORT || 3000;

var router = express.Router();


//-------- настраиваем маршрутизатор сервера------------
router.get('/nodes', function(req, res) {
	//-------------извлечение всех данных---------------
	res.json(nodes);
});
	
app.use('/api', router);

	// Запускаем http сервер
app.listen(port);
console.log('server start' + port);

var WebSocketServer = new require('ws');

//----------объект содержащий список зарегестрированных клиентов
var clients = {};

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
	port: 8081
});

webSocketServer.on('connection', function(ws) {

	var id = Math.random();
	clients[id] = ws;
	console.log("новое соединение " + id);
	
	var mes = {
		'id': id,
		'text': 'соеденение установлено',
		'data': {}
	};
	
	ws.on('message', function(message) {
		console.log('получено сообщение ' + message);
				
    });
	
	ws.on('close', function() {
		console.log('соединение закрыто ' + id);
		delete clients[id];
	});

 
});

var events;

//-----------функция для генерации случаного числа из диапазона
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// начать повторы с интервалом 2 сек
var timerId = setInterval(function() {
  var node = getRandomInt(2,70);
  var status = getRandomInt(0,1);
  console.log(node + "  " + status);
			
			var eventXml = "<entry>"
				+"<eventinstance actioninstance='ACTIONINSTANCE.PING.PING.55'"
				+ " event='EVENT.PING.RESULT' node='NODE." + node +"'"
				+ " result='Ping for [ocalhost] succeeded (4/4 packets) with RTT 0.25 ms.'" 
				+ " time_high='30507288' time_low='1953380656'" 
				+ " id='197'     module='PING' name='RESULT'" 
				+ " status='" + status + "'>"
					+"<property name='PACKET COUNT' value='4' />"
					+"<property name='PACKET SUCCEEDED' value='4' />"
					+"<property name='RTT' value='0.250000' />"
				+"</eventinstance>"
				+"</entry>";
				
				//---------------парсинг xml--------------
				parseString(eventXml, pars_opts, 
				function (err, result) {
					if (err) {
						console.log("---ERROR PARSING--" + err)
					} else {	
						var events = JSON.stringify(result);
						//-----------отправляем всем клиентам-------------
						console.dir(events);
						for (var key in clients) {
							try {
								clients[key].send(events);
							} catch (error) {
								if (error == "Error: not opened") {
									delete clients[key];
								};
								console.log("---SEND MESSAGE" + error);
							}
						}
					}
				});
					
					
  
			
}, 500);