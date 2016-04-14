'use strict';
(function(){
	var serverAJAX = "http://localhost:3000/api/";
	var serverWS = "ws://localhost:8082";

	//-------сервис обслуживающий список узлов системы на клиентской стороне
	angular.module('netmonApp')
		.service('nodeServ', ['$q', '$http', '$rootScope', nodeServ]);
		
		function nodeServ($q, $http, $rootScope) {
			
			var resultNodesHash; //------храним исходный со ссылками просто искать по ID------
			var resultNodesTree; // --------кеширована версия нодов для теста-----------------
			
			//----------------------получение cписка Nodow с сервера по AJAX --------------------------------
			//----------------------------хеширование и построение дерева------------------------------------
			this.getNodes = function() {
				return $http.get(serverAJAX + 'nodes')
					.then(function (res) {
						console.log(res.data.node);
						resultNodesHash = buildHash(res.data.node);     //------формируем хеш по сырым данным
						resultNodesTree =	transform(resultNodesHash); //------------строим дерево
						console.log(res.data.node);
						return resultNodesTree;
					}, function(err) {
						//------вернуть ошибку-----
						console.log("что то не так");
					});
			};
			
			//--------------- метод принимает нод(обект) и встаривает его внужное место дерева ----------------
			//--------------- сначала обновляет хеш, потом по обновленному хешу перестраивает дерево ----------
			//--------------- возвращает результирующие дерево, для формирование модели------------------------
			this.updateNode = function(node) {
				//	console.log(JSON.stringify(resultNodesHash));
				var node_name = 'NODE.' + node.attrib.id;
				node.parentId = []; //---------- парент ID пока так
				resultNodesHash[node_name] = node;
				return transform(resultNodesHash);
			};
			//--------------- метод принимает иимя нода и удаляет его из хеша---------- -----------------------
			//--------------- сначала обновляет хеш, потом по обновленному хешу перестраивает дерево ----------
			//--------------- возвращает результирующие дерево, для формирование модели------------------------
			this.removeNode = function(node_name) {
				//	console.log(JSON.stringify(resultNodesHash));
				delete resultNodesHash[node_name];
				return transform(resultNodesHash);
			};
			
			
			//------------------определяет parentId нужно для вставки элемента ------------
			//-----------принимает id нода клика и если это група возвращает его-----------
			//-------------------если нет возращает ID ближайшей групы---------------------
			//-------------------------или 0 если корневой элемент ------------------------
			this.getParenId = function(id) {
				var node_name = 'NODE.'+ id;
				var parentId;
				
				if (resultNodesHash[node_name].attrib.type == "GROUP") {
					alert("----");
					parentId =  id;
				} else 
				if (resultNodesHash[node_name].parentId.length == 0) {
					alert("0");
					parentId =  0;
				} else 
				if (resultNodesHash[node_name].parentId.length != 0) {
					var parentu = resultNodesHash[node_name].parentId;
					var parentId = parentu[par.length - 1]; 
				}; 
				
				return parentId;
			}
									
			//---------отправка сообщения на сервер на добавление (обновление) нода -------
			//---------------принимает data - объект с описанием параметров нода ----------
			//---------------ждет статуса выполненной операции, обновление дерева ---------
			//--------------- произойдет по бродкасту--------------------------------------
			this.addNodeSend = function(item, parentId) {
				var node = {};
				node.item = item; //--- сам нод
				node.parentId = parentId;
				return $http({method: "Post", url: serverAJAX + 'nodes', data: node}).then(function(res){
					//---- обрабатываем пользователские сообщения
					//----  в случае успешного web но неуспешного по сути
					if (res.data.type == 'error') {
						alert(res.data.value);
						return $q.reject(new Error(res.data.value));
					} else {
						return res;
					}
				}, function(err){
					//------вернуть ошибку-----
					console.log("что то не так с сервером");
					return $q.reject(new Error("Что-то не так с сервером"));
				});
			};
			
			//-------------------отправка сообщения на сервер на удаление нода ------------
			//------------принимает node-name - объект с описанием параметров нода --------
			//----------------------ждет статуса выполненной операции----------------------
			//----------------------обновление произойдет по бродкасту---------------------
			this.removeNodeSend = function(item){
				
				var node_name = 'NODE.' + item.attrib.id;
				return $http({method: "DELETE", url: serverAJAX + 'nodes/' + node_name })
				.then(function(res){
					
					if(res.data.type == 'error') {
						return $q.reject(new Error(res.data.value));
					} 
					console.log(res.data);
					return res;
				}, function(err){
					//------вернуть ошибку----- и наверное это я отдам в интерсептор запросов
					console.log("что то не так с сервером");
					return $q.reject(new Error("Что-то не так с сервером при удалении"));
				});
			}
			
		}	//---- закрытие nodeServ----------------
		
		//------ функции формирующие ХЕШ нодов и трансформирующие дерево ----- 
		// 1. сделать корневой фолдер (должен быть, при добавлениие это важно)
		// 2. метод добавить удалить узел переместить узел 
		
		function buildHash(rawc){
			var res = {};
				var i;
				//строим хеш наверное делать на єтапе парсинга ][ml н сервере
				for (i in rawc) {
					var key = 'NODE.'+rawc[i].attrib.id;
					res[key] = rawc[i]; 
					res[key].parentId = [];
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
							obj.parentId.push(res[i].attrib.id);// = res[i].parentId.concat(res[i].attrib.id); //------------деллаем ссылку на родительский эллемент
						} else {
							delete res[i].subitem[k];
							// наверное удалить subitem
						}
							
					  //console.log(key);
					}
					var t1 = performance.now();
					console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to generate:', result);
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
})();


