'use strict';

(function(isNodejs, isAngular){	
	
	//---------объект Singlenton для экспорта 
	function nodesList() {
		
		//-----------НЕКРАСИВО НО ПОКА ТАК--------
		if (isNodejs) {
			// NodeJS module definition
			var nodeModule = require('./nodesItem.js');
		}
		
		var resultNodesHash; //------хеш списка нодов в виде [NODE.id:{node},...]---------
		var resultNodesTree; // ------------------дерево нодов----------------------------
		
		//-----------------инициализирует хеш нодов из сырых данных-----------------------
		//-----------------формирует кеш нодов по сырым данным нодов----------------------
		//-------------может использоваться как на сервере так и на ядре------------------
		this.initNodesHashByRd = function(rawd) {
			resultNodesHash = buildHash(rawd);     //------формируем хеш по сырым данным--
			return resultNodesTree;
		};
		
		//-----------------инициализирует хеш нодов из другого хеша ----------------------
		//----нужно чтобы клиенту не запрашивать сырые данные с сервера, а потом ядра-----
		//----------клиентский кеш обновляется по серверному кешу-------------------------
		this.initNodesHashByHash = function(hash) {
			resultNodesHash = null;
			resultNodesHash = hash;
		}
		//---------отдает хеш для обновление модели---------------------------------------
		this.getNodesHash = function() {
			if (resultNodesHash) {
				return resultNodesHash;
			} else
			{
				throw new Error("Хеш нодов не сформированный");
			}
		};
		
		//----------------Отдает Нод из Хеша по ID -----------------------
		this.getNodeById = function(id) {
			var name = "NODE." + id;
			return resultNodesHash[name]; 
		};
		
		//--------перестраивает дерево по хешу и возвращаем дерево-------------------------
		this.getNodesTree = function() {
			if (resultNodesHash) {
				resultNodesTree = transform(resultNodesHash); //------------строим дерево--
				return resultNodesTree;
			} else
			{
				throw new Error("Хеш нодов не сформированный");
			}
		}
		
		//------------------определяет parentId нужно для вставки элемента ------------
		//-----------принимает id нода клика и если это група возвращает его-----------
		//-------------------если нет возращает ID ближайшей групы---------------------
		//-------------------------или 0 если корневой элемент ------------------------
		this.getParenId = function(id) {
			var node_name = 'NODE.'+ id;
			var parentId;
			
			if (resultNodesHash[node_name].attrib.type == "GROUP") {
				//alert("----");
				parentId =  id;
			} else 
			{
				parentId = resultNodesHash[node_name].parentId
			}; 
			return parentId;
		}
		
		
		//--------------- метод принимает нод(обект) и встаривает его внужное место в хеше нодов ----------
		//------------------------------ обновляет хеш нодов ----------------------------------------------
		this.updateNode = function(node) {
			//	console.log(JSON.stringify(resultNodesHash));
			var node_name = 'NODE.' + node.attrib.id;
			node.parentId = 0; //---------- парент ID пока так
			resultNodesHash[node_name] = node;
		};
		//--------------- метод принимает иимя нода и удаляет его из хеша-----------------------------------
		//------------------------------ обновляет хеш нодов -----------------------------------------------
		this.removeNode = function(node_name) {
			//	console.log(JSON.stringify(resultNodesHash));
			delete resultNodesHash[node_name];
		};
	
		//------ функции формирующие ХЕШ нодов и трансформирующие дерево ----- 
		// 1. сделать корневой фолдер (должен быть, при добавлениие это важно)
		// 2. метод добавить удалить узел переместить узел 
		
		function buildHash(rawd){
			var res = {};
			var i;
			//строим хеш наверное делать на єтапе парсинга ][ml н сервере
			for (i in rawd) {
				var key = 'NODE.'+rawd[i].attrib.id;
				//res[key] = rawd[i]; 
				//res[key].parentId = 0;
				res[key] = new nodeModule.node(rawd[i], 0); //--инициализируем через конструктор
				console.log(res[key].getId());
			}
			return res;
		};
		
		function transform(res) {
			
			var result = {};
			var i;
							
			for (i in res) {
				
				if (res[i].attrib.type === 'GROUP') {
					var k;
					res[i].nodes = {};
					var t0 = performance.now();
					for (k in res[i].subitem) {
						var key = res[i].subitem[k].attrib.name; //Node.N
						
						if (res[key]) {
							var obj = res[key];
							res[i].nodes[key] = obj;
								
							obj.isSubitem = true;
							obj.parentId = res[i].attrib.id;// = res[i].parentId.concat(res[i].attrib.id); //------------деллаем ссылку на родительский эллемент
						} else {
							delete res[i].subitem[k];
							// наверное удалить subitem
						}
							
					  //console.log(key);
					}
					var t1 = performance.now();
					//console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to generate:', result);
				}
				
			}
			for (i in res) {
				if (!res[i].isSubitem) { 
					result[i] = res[i];
				}
				
			}
			//console.log(res);
			return  result;
		}
	}

	//--------определение модуля на экспорт Angular, NodeJS
	if (isAngular) {
		// AngularJS module definition
		angular.module('netmonApp')
			.service('nodesList', nodesList);
	} else 
	if (isNodejs) {
		// NodeJS module definition
		module.exports = nodesList;

	}

})(typeof module !== 'undefined' && module.exports, typeof angular !== 'undefined');
