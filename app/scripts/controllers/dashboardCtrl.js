'use strict';
//------------используется нотация минимизации, порядок внедренных 
//зависимостей должен совподать с тем что перечисленно в аргументах функции
angular.module('netmonApp')
  .controller('dashboardCtrl', ['nodeServ', 'dashServ', '$scope', '$state',  '$localStorage', 
	function (nodeServ, dashServ, $scope, $state,  $localStorage) {
		var steck_length = 31; //----------- переменная для инициализации длины списка подсвеченных эллементов
		
		$scope.dash = dashServ.initDash();
		
		//------------инициализация greedster
		$scope.selIt;
		$scope.nodes;
		$scope.evJdro={}; 
		$scope.evJdro.status;
		$scope.events = {};
		//----------- если работает пересмотреть ))))
		$scope.events.curentId = $state.params.id;
		
		
		
		$scope.setCurTreeId = function() {
			//alert("asdas");
			//----потестить диррективу stop propogation в директиве
		};
		
		//-инициализация нодов при загрузке
		nodeServ.getNodes().then(function(data){
			$scope.nodes = data;
		}, function(){
			//----------инициализировать статус бар где отобразить ошибку
		});
		
		//----------- слушает событие deletenode и обновляет модель
		//----------- может назвать не делете а гзвфеу
		$scope.$on('updatenodes', function(){
			$scope.nodes = nodeServ.updateNodes();
		});
		
		
		
				
		nodeServ.createConection();
		//-------------------обработчик для входящих событий eventinstance
		$scope.$on('J_eventinstance', function(event, res) {
			//					console.log("--------------------")
			//---------- этот обработчик по сути включает режим монииторинга входящих событий
			//1. так как событий может быть много необходимо подумать о стеке и его реализации
			//2. если необходимо посмотреть историю событий необходимо остановить мониторинг 
			//	т.е. отключить это монитор и реализовать загрузку данных в виджеты с пагинацией
				
			$scope.evJdro.status = res.attrib.status;
			console.log( res.attrib);
			var id = res.attrib.node.split(".")[1];
			$scope.evJdro.id = id;
				//----------- вот это все нужно будет продумать сделать стеком на опрделенное количество записей
			$scope.events[id] = $scope.events[id] || [];
			$scope.events[id].unshift(res);
			if ($scope.events[id].length === steck_length) {
				$scope.events[id].pop();
			}
				//----------- вот это все нужно будет продумать сделать стеком на опрделенное количество записей
				//----------unshift добовляем в голову списка
			$scope.allEvents = $scope.allEvents || [];
			$scope.allEvents.unshift(res);	
			if ($scope.allEvents.length === steck_length) {
				$scope.allEvents.pop();
			}
			
			$scope.$apply();
		});
		
		//-------------------обработчик для входящих событий node
		$scope.$on('J_node', function(event, res) {
			//---------почему так нужно делать пока незнаю но обновление объекта
			//---------добавление и удаление происходит нормально, а вот обновление падает
			//-------- сделал такой хак
				delete $scope.nodes;
				$scope.$apply();
				$scope.nodes = nodeServ.updateNodes(); //---- перестраивает дерево по хешу и обновляем модель
				$scope.$apply();
				console.log($scope.nodes);
		});
		
		
		//---------------данный блок нужно будет перенести в контроллер диррективы events что бы он там крутился
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$scope.curentId = $state.params.id;
			$scope.curentRoot = $state.params.id;
		
		});
		$scope.getCl = function(item){
			return item.attrib.status == 'SUCCESS' ? 'indicat-onn':'indicat-off';
		};
		//---------------данный блок нужно будет перенести в контроллер диррективы events что бы он там крутился
		//---------------данный блок нужно будет перенести в контроллер диррективы addVidget что бы он там крутился
		$scope.addVidg = function(name, type) {
			dashServ.addVidget(name, type);
		};
		//---------------данный блок нужно будет перенести в контроллер диррективы addVidget что бы он там крутился
		$scope.deleVidget = function(vidget) {
			dashServ.delVidget(vidget);
			
		};
		
  }]);
