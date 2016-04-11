'use strict';
(function(){
	var serverAJAX = "http://localhost:3000/api/";
	var serverWS = "ws://localhost:8081";

	//-------сервис обслуживающий список узлов системы на клиентской стороне
	angular.module('netmonApp')
		.service('nodeServ', ['$q', '$http', '$rootScope', nodeServ]);
		
		function nodeServ($q, $http, $rootScope) {
			//----------получение cписка Nodow с сервера по AJAX -----------
			this.getNodes = function() {
				return $http.get(serverAJAX + 'nodes')
					.then(function (res) {
						
						var res =	transform(res.data.node);
						return res;
						//return data.data.node;
					}, function(err) {
						//------вернуть ошибку-----
						console.log("что то не так");
					});
			};
			//---------------добавление нода в дерево-----------
			this.addNodes = function(item) {
				
				return $http({method: "Post", url: serverAJAX + 'nodes', data: item}).then(function(res){
					alert(JSON.stringify(res.data));
					//---- обрабатываем пользователские сообщения
					//----  в случае успешного web но неуспешного по сути
					if (res.data.status !='ok') {
						return $q.reject(new Error(res.data.message));
					} else {
						return res;
					}
				}, function(err){
					//------вернуть ошибку-----
						console.log("что то не так с сервером");
						return $q.reject(new Error("Что-то не так с сервером"));
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
				
				//--------обработчик поступления соедения--------
				curSocket.onmessage = function(message) {
					//console.log(message.data);
					$rootScope.$broadcast('eventJadro', JSON.parse(message.data).eventinstance[0]);
				};
						
			}
		};
		
		
		//------------ функция трансформирующия дерево и строит hesh Nodov
		function transform(rawc) {
			
				var res = {};
				var result = {};
				var i;
				//строим хеш наверное делать на єтапе парсинга ][ml н сервере
				for (i in rawc) {
					var key = 'Node.'+rawc[i].attrib.id;
					res[key] = rawc[i]; 
					
									res[key].parentId = [];
				}
				
				for (i in res) {
					
					if (res[i].attrib.type === 'Group') {
						var k;
						res[i].nodes = {};
						for (k in res[i].subitem) {
							var key = res[i].subitem[k].attrib.name;
							res[i].nodes[key] = res[key];
								
							res[key].dele = true;
							res[key].parentId = res[i].parentId.concat(res[i].attrib.id); //------------деллаем ссылку на родительский эллемент
								
						  //console.log(key);
						}
					}
				}
				for (i in res) {
					if (!res[i].dele) {
						result[i] = res[i];
					}
					
				}
				//console.log(res);
				return result;
			}
})();


