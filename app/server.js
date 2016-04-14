

 	
const dcp = require('../node_modules/dcpnode/dcpnode.node');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');

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
nodesGet = router.route('/nodes');
nodesGet.get(function(req, resHttp) {
	
	
	//-------------- запрашиваем список Нодов -------
	dcp.send("C_GetObjectList", "NODE", 
	function(mes){
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

//--------------получаем команду на добавление нода-------------------
var nodeAddReceive = router.route('/nodes');
nodeAddReceive.post(function(req, res) {
	var nodeAttrib = req.body.item;
	var parentId = req.body.parentId;
	
	console.log("parentId====" + parentId);	
	
		
	var message = { type: 'error',           //---------статус оаерации
		value: 'DCP Add node work ERROR'  //--------- сообщение по результатам операции
	};
	
	//---------формируем нод---
		var node = {};
		node.attrib = nodeAttrib;
		console.log(node);
		var builder = new xml2js.Builder({rootName:'node', attrkey: 'attrib', pretty:false, doctype: false}); 
		var xml = builder.buildObject(node);
		
		console.log(xml);
	//-------------------------
	
	dcp.send("C_UpdateObject", xml, function(mes){
		
		parseString(mes, pars_opts,
		function (err, parse_res) {
			if(err) { //--- ошибка парсинга  ответа DCP
				return false;
			};
			console.log(parse_res);
			if (parse_res.result.attrib.type == 'error') {
				message.type = 'error';
				message.value = parse_res.result.attrib.value;
			} else 
			{
				message.type = 'ok';
				message.value = parse_res.result.attrib.value;
			}
			res.json(message);
		});
		
		
		if (parentId == 0){
			//---просто добавляем нод---
		} else {
			//---добавляем нод в групу	
		}

	}, function(err){
		console.log('DCP Add node work ERROR - ' + err);
	});
		
});


//--------------получает команду на удаление нода-----------------
var nodeRemoveReceive = router.route('/nodes/:node_name');
nodeRemoveReceive.delete(function(req, res) {
	var node_name = req.params.node_name;
	
	console.log("Удаляем нод по node_name " + node_name);
	var message = { type: 'error',           //---------статус оаерации
		value: 'dcp Remove work error'  //--------- сообщение по результатам операции
	};
	
	dcp.send("C_RemoveObject", node_name, function(mes){
									
		parseString(mes, pars_opts,
		function (err, parse_res) {
			if(err) { //--- ошибка парсинга  ответа DCP
				return false;
			};
			console.log(parse_res);
			if (parse_res.result.attrib.type == 'error') {
				message.type = 'error';
				message.value = parse_res.result.attrib.value;
			} else 
			{
				message.type = 'ok';
				message.value = parse_res.result.attrib.value;
			}
			res.json(message);
		});
	
	}, function(err){
		console.log("DCP Remove node work ERROR- " + err);
		res.json(message);
	});
	//---- необходимо подумать над форматом служебных сообщений
	
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


//-----------функция для отправки сообщения всем клиентам------------
//-------------------message JSON------------------------------------
function socketSendAll(message) {
	
	for (var key in clients) {
		try {
			var mes = JSON.stringify(message);
			clients[key].send(mes);
		} catch (error) {
			if (error == "Error: not opened") {
				delete clients[key];
			};
			console.log("---SEND MESSAGE" + error);
		}
	}
}

//------------------- вешаю обработчик------------
dcp.on("data", function(type, mes){
	console.log("-----------------------------------------------------------------------");
	console.log("Коллбек onData type=" + type);
	
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~ПАРСИНГА111~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	console.log("Коллбек onData type=" + mes);
	
	//C_ObjectRemoveInfo,    C_ObjectListInfo,           C_OperationResult,      C_RunScanTask,
	
	
	var responce = {}; //responce.typy; responce.message
	responce.type = type;
	
	if(type == "C_ObjectInfo"){
	
		parseString(mes, pars_opts,
		function (err, parse_res) {
			if(err) { //--- ошибка парсинга  ответа DCP
				return false;
			};
			responce.message = parse_res;
			socketSendAll(responce);
		});
		
	} else 
	if (type == "C_ObjectRemoveInfo"){
		responce.message = mes;
		socketSendAll(responce);
	}
	
});

