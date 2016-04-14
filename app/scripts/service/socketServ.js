'use strict';
(function(){
	
	var serverWS = "ws://localhost:8082";

	angular.module('netmonApp')
		.service('socketServ', ['$rootScope', socketServ]);
		
	function socketServ($rootScope){
	
	//------------полуучение потока eventov с сервера и генерация сообщения об этом
		this.createConection = function() {
			var curSocket = new WebSocket(serverWS);
			//---------------регистрация обработчиков--------
			//-----------обработчик создания соеденения------
						
			curSocket.onopen = function() {
				console.log('websocet conection start');
			};
			
			//--------обработчик поступления сообщений по сокету--------
			curSocket.onmessage = function(responce) {
				
				var data = JSON.parse(responce.data);
				if (data.type == 'C_ObjectInfo') {
					console.log(responce);
					var obj = data.message;
					if (obj.eventinstance) {
						console.log('event now');
						$rootScope.$broadcast('C_ObjectInfo_Eventinstance', obj.eventinstance);
					} if (obj.node) {
						console.log('node now');
						$rootScope.$broadcast('C_ObjectInfo_Node', obj.node);
					}
				} else 
				if (data.type == 'C_ObjectRemoveInfo'){
					var mes = data.message.split('.');
					console.log(data.message);
					if (mes[0] == 'NODE') {
						console.log('Remove Node');
						//------data.message -- это Node Name
						$rootScope.$broadcast('C_ObjectRemoveInfo_Node', data.message);
					};
				}
				
			};//---- закрытие обработчика событий сокет
					
		
		}
	};
			
	
})();