'use strict';
(function(){
	var serverAJAX = "http://localhost:3000/api/";
	var serverWS = "ws://localhost:8082";

	//-------сервис обслуживающий список узлов системы на клиентской стороне
	angular.module('netmonApp')
		.service('nodeServ', ['$q', '$http', '$rootScope', nodeServ]);
		
		function nodeServ($q, $http, $rootScope) {
			
			var resultNodesHash; //------храним исходный со ссылками просто искать по ID
			var resultNodesTree; // ----кеширована версия нодов для теста
			
			
			this.updateNodes = function() {
				//перестраиваем дерево по хешу
			//	console.log(JSON.stringify(resultNodesHash));
				return transform(resultNodesHash);
			}
			
			//----------получение cписка Nodow с сервера по AJAX -----------
			this.getNodes = function() {
				return $http.get(serverAJAX + 'nodes')
					.then(function (res) {
						
						resultNodesHash = buildHash(res.data.node);
						resultNodesTree =	transform(resultNodesHash); //------строим дерево
						console.log(res.data.node);
						return resultNodesTree;
						//return data.data.node;
					}, function(err) {
						//------вернуть ошибку-----
						console.log("что то не так");
					});
			};
			//---------------добавление нода в дерево-----------
			this.addNodes = function(item, parentId) {
				
				return $http({method: "Post", url: serverAJAX + 'nodes', data: item}).then(function(res){
					//alert(JSON.stringify(res.data));
					//---- обрабатываем пользователские сообщения
					//----  в случае успешного web но неуспешного по сути
					if (res.data.status !='ok') {
						return $q.reject(new Error(res.data.message));
					} else {
						
												
						//-----------функция для генерации случаного числа из диапазона
								function getRandomInt(min, max) {
								  return Math.floor(Math.random() * (max - min + 1)) + min;
								}
								var id = getRandomInt(120, 150);
						
						//-------   создаем узел --------------------
						var node = {
							"attrib":{
								"type": item.type.zn,
								"id": id + "", //---------приведение типов в JS это круто 
								"ip": item.ipaddress,
								"hostname": item.hostname,
								"caption": item.caption
							},
							"parentId": []
						};
						
						if (item.type.zn == "GROUP") { //---------eсли node Group то добавляем subitem
							node.subitem = [];
						}
						//-------   создаем узел --------------------
						
						//------------добавляем объект в Хеш
						resultNodesHash['Node.'+ id] = node;
						var subitRef = {
							attrib: {
								"name": 'Node.'+ id
							}
						};
											
						var parentNode;
						console.log(parentId);
						if (resultNodesHash['Node.'+ parentId].attrib.type == "GROUP") {
							parentNode =  resultNodesHash['Node.'+ parentId].subitem;
						} else if (resultNodesHash['Node.'+ parentId].parentId.length != 0) {
							var par = resultNodesHash['Node.'+ parentId].parentId;
							var parId = par[par.length - 1]; 
							parentNode =  resultNodesHash['Node.' + parId].subitem;
						} else {
							console.log("--------------------");
						};
						
						parentNode ? parentNode.unshift(subitRef) : false;
						
						
						return res;
					}
				}, function(err){
					//------вернуть ошибку-----
						console.log("что то не так с сервером");
						return $q.reject(new Error("Что-то не так с сервером"));
				});
			};
			
			this.deleteNodes = function(item){
				var itId = item.attrib.id;
				return $http({method: "DELETE", url: serverAJAX + 'nodes/' +itId }).then(function(res){
					
					if(res.data.status !='ok') {
						$q.reject(new Error(res.data.message));
					} else {
							//-----------ДАЛЯМ НОД ИЗ ХЕША ---
							delete resultNodesHash['Node.'+ itId];
						
						return res;
					}
				}, function(err){
					//------вернуть ошибку-----
						console.log("что то не так с сервером");
						return $q.reject(new Error("Что-то не так с сервером при удалении"));
				});
			}
			
			//------------полуучение потока eventov с сервера и генерация сообщения об этом
			this.createConection = function() {
				var curSocket = new WebSocket(serverWS);
				//---------------регистрация обработчиков--------
				//-----------обработчик создания соеденения------
							
				curSocket.onopen = function() {
					console.log("websocet conection start");
					//curSocket.send(JSON.stringify({'type': 'getfolder', 'path': 'd:/test'}));
				};
				
				//--------обработчик поступления сообщений по сокету--------
				curSocket.onmessage = function(message) {
					
					//----console.log(message.data);
					var obj = JSON.parse(message.data)
					
					if (obj.eventinstance) {
						console.log("event now");
						$rootScope.$broadcast('J_eventinstance', obj.eventinstance);
					} if (obj.node) {
						console.log("node now");
						var hashIndex = 'Node.' + obj.node.attrib.id;
						obj.node.parentId = [];
						resultNodesHash[hashIndex] = obj.node;
						$rootScope.$broadcast('J_node', obj.node);
					}
					
				};//---- закрытие обработчика событий сокет
						
			
			}
		};
		
		
		//------------ функция трансформирующия дерево и строит hesh Nodov
		// 1.строить хеш без Нодес меньше кода, более читаемо
 		// 2. сделать корневой фолдер (должен быть, при добавлениие это важно)
		// 3. метод добавить удалить узел переместить узел 
		//
		//
		function buildHash(rawc){
			var res = {};
				var i;
				//строим хеш наверное делать на єтапе парсинга ][ml н сервере
				for (i in rawc) {
					var key = 'Node.'+rawc[i].attrib.id;
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
									
								obj.dele = true;
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
					if (!res[i].dele) { // сделать не dele а isSubitem является ли он SubItemom
						result[i] = res[i];
					}
					
				}
				//console.log(res);
				return  result;
				
		}
})();


