


 
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
	+ "<node type='Device' id='30' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Device' id='31' ip='192.168.0.1' hostname='localhost' caption='Dev1'></node>"
	+ "<node type='Group' id='32' caption='Sofffft4'>"
		+ "<subitem name='Node.30'></subitem>"
		+ "<subitem name='Node.31' /></node>"
	+ "</entry>";


var parseString = require('xml2js').parseString;
var nodes;
parseString(xml, {
	attrkey: 'attrib',
	charkey: 'char',
	explicitRoot:false
	
	
	},
function (err, result) {
	nodes = result;
    console.dir(JSON.stringify(result));
});



	//------------створюємо сервер---------------
var express = require('express');

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))
.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
.use(bodyParser.json()); //--------важно----

var port = process.env.PORT || 3000;

var router = express.Router();


//-------------------------------------------------------------------
//----------------------------------------------------
router.get('/nodes', function(req, res) {
	//-------------извлечение всех данных---------------
	res.json(nodes);
});
	
app.use('/api', router);

	// Запускаємо сервер
app.listen(port);
console.log('server start' + port);