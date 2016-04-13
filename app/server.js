

 	
const dcp = require('../node_modules/dcpnode/dcpnode.node');
var parseString = require('xml2js').parseString;
var nodes;

//---------------опции парсера--------------
var pars_opts = {
	attrkey: 'attrib',
	charkey: 'char',
	explicitRoot:true
};

//----------------коннектимся к DCP----------
dcp.connect(function(mes){
	console.log("onconnect" + mes);
}, function(err){
	console.log("err conect   " + err);
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

//-----------------------------------------------------
//-------------------ДЛЯ НОДОВ-------------------------
//-------- настраиваем маршрутизатор сервера--------
//-------------извлечение всех данных---------------
nodesget = router.route('/nodes');
nodesget.get(function(req, resHttp) {
	
	
	//-------------- запрашиваем список Нодов -------
dcp.send("C_GetObjectList", "NODE", function(mes){
	console.log("JS SendOk LIST");
		
		parseString(mes, pars_opts,
		function (err, res) {
			
			if(err) { //--- ошибка парсинга  ответа DCP
				return false;
			};
			console.log(res);
			if (res.result.attrib.type != "ok"){ //------ошибка при запросе
				return false;
			};
							
			parseString(res.result.attrib.value, pars_opts,
			function (err, res) {
				if(err) { //--- ошибка парсинга  ответа DCP result.attrib.value
					return false;
				};
				nodes = res.list;
																		resHttp.json(nodes);
				console.dir(JSON.stringify(res.list));
					// отправить клиенту результат 
			});
		});
			
		}, function(err){
			console.log("Send Error" + err);
		});
		
	
	
	
	
	
	
});

//--------------добавление нода-------------------
var nodeadd = router.route('/nodes');
nodeadd.post(function(req, res) {
		//TODO необходимо сериализировать форму в xml
		//вызвать метод отправки сообщения ядру
	console.log(req.body);
	//---- необходимо подумать над форматом служебных сообщений
	//"NODE" XML//
		
	dcp.send("C_UpdateObject", "NODE", function(mes){
		
	}, function(err){
		
	});
	
	var mes = {
		status: 'ok',             //---------статус оаерации
		message: 'Узел добавлен'  //--------- сообщение по результатам операции
	};
	res.json(mes);
});


//--------------удаление нода-------------------
var nodedelete = router.route('/nodes/:id');
nodedelete.delete(function(req, res) {
	var id = req.params.id
		//TODO необходимо сериализировать форму в xml
		//вызвать метод отправки сообщения ядру на удаление нода
	console.log("Удаляем нод по ID " + id);
	//---- необходимо подумать над форматом служебных сообщений
	var mes = {
		status: 'ok',           //---------статус оаерации
		message: 'Узел удален'  //--------- сообщение по результатам операции
	};
	res.json(mes);
});

//--------------------------------------------------------------
	
app.use('/api', router);

	// Запускаем http сервер
app.listen(port);
console.log('server start' + port);

var WebSocketServer = new require('ws');

//----------объект содержащий список зарегестрированных клиентов
var clients = {};

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
	port: 8082
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


//------------------- вешаю обработчик------------
dcp.on("data", function(type, mes){
	console.log("-----------------------------------------------------------------------");
	console.log("Коллбек onData type=" + type);
	
	console.log("~~~~~~~~~~~~~~~~~~~~~~ПАРСИНГА111~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	
	parseString(mes, pars_opts,
	function (err, res) {
		if(err) { //--- ошибка парсинга  ответа DCP
			return false;
		};
		//----------сделать отдельной функцией
			var message = JSON.stringify(res);
		
			for (var key in clients) {
				try {
					clients[key].send(message);
				} catch (error) {
					if (error == "Error: not opened") {
						delete clients[key];
					};
					console.log("---SEND MESSAGE" + error);
				}
			}
		
	});
});

