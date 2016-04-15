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
			
			//----------------------------обработчик поступления сообщений по сокету--------------
			//--------все сообщения которые приходят по сокету генерируют соответствующие---------
			//-----------пользовательские события GUI, контроллеры приложения будут их -----------
			//------------слушать и если им это интресено обрабатывать и изменять модель----------
			
			curSocket.onmessage = function(responce) {
				
				var data = JSON.parse(responce.data);
				//----------событие по возникновению евентов в ядре------
				if (data.type == 'C_ObjectInfo_Eventinstance') {
					console.log('event now');
					$rootScope.$broadcast('C_ObjectInfo_Eventinstance', data.message);
				} else
				//----------событие по возникновению обновлению нодов------
				if (data.type == 'C_ObjectInfo_Node') {	
					console.log('node now');
					$rootScope.$broadcast('C_ObjectInfo_Node', data.message);
				} else 
				//----------событие по возникновению удалению нодов------
				if (data.type == 'C_ObjectRemoveInfo_Node'){
					console.log('Remove Node');
					//------data.message -- это Node Name
					$rootScope.$broadcast('C_ObjectRemoveInfo_Node', data.message);
				}
				
			};//---- закрытие обработчика событий сокет
					
		
		}
	};
			
	
})();