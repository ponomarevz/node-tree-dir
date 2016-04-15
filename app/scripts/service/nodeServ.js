'use strict';
(function(){
	var serverAJAX = "http://localhost:3000/api/";
	var serverWS = "ws://localhost:8082";

	//-------сервис обслуживающий список узлов системы на клиентской стороне
	angular.module('netmonApp')
		.service('nodeServ', ['$q', '$http', '$rootScope', 'nodesList', nodeServ]);
		
		function nodeServ($q, $http, $rootScope, nodesList) {
			
									
			//----------------------получение cписка Nodow с сервера по AJAX --------------------------------
			//----------------------------хеширование и построение дерева------------------------------------
			this.getNodes = function() {
				return $http.get(serverAJAX + 'nodes')
					.then(function (res) {
						console.log(res.data);
						nodesList.initNodesHashByHash(res.data);
						return  nodesList.getNodesTree();
					}, function(err) {
						//------вернуть ошибку-----
						console.log("что то не так");
					});
			};
			
			//--------------- метод принимает нод(обект) и встаривает его внужное место дерева ----------------
			//--------------- сначала обновляет хеш, потом по обновленному хешу перестраивает дерево ----------
			//--------------- возвращает результирующие дерево, для формирование модели------------------------
			this.updateNode = function(node) {
				nodesList.updateNode(node);
				return nodesList.getNodesTree();
			};
			//--------------- метод принимает иимя нода и удаляет его из хеша---------- -----------------------
			//--------------- сначала обновляет хеш, потом по обновленному хешу перестраивает дерево ----------
			//--------------- возвращает результирующие дерево, для формирование модели------------------------
			this.removeNode = function(node_name) {
				//	console.log(JSON.stringify(resultNodesHash));
				nodesList.removeNode(node_name);
				return  nodesList.getNodesTree();
			};
						
			//------------------определяет parentId нужно для вставки элемента ------------
			//-----------принимает id нода клика и если это група возвращает его-----------
			//-------------------если нет возращает ID ближайшей групы---------------------
			//-------------------------или 0 если корневой элемент ------------------------
			this.getParenId = function(id) {
				return nodesList.getParenId(id);
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
		
})();


