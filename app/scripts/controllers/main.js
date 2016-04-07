'use strict';

/**
 * @ngdoc function
 * @name netmonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the netmonApp
 */
angular.module('netmonApp')
  .controller('MainCtrl', function (nodeServ, dashServ, $scope, $state,  $localStorage) {
		
		$scope.dash = dashServ.initDash();
		
		//------------инициализация greedster
		$scope.selIt;
		$scope.nodes;
		$scope.evJdro={}; 
		$scope.evJdro.status ="1";
		$scope.events = {};
		//----------- если работает пересмотреть ))))
		$scope.events.curentId = $state.params.id;
		
		
		
		$scope.setCurTreeId = function() {
			//alert("asdas");
			//----потестить диррективу stop propogation в директиве
		};
		
		nodeServ.getNodes().then(function(data){
			$scope.nodes = data;
			
		});
		
		
				
		nodeServ.createConection();
		
		$scope.$on('eventJadro', function(event, res) {
			//					console.log("--------------------")
			//---------- этот обработчик по сути включает режим монииторинга входящих событий
			//1. так как событий может быть много необходимо подумать о стеке и его реализации
			//2. если необходимо посмотреть историю событий необходимо остановить мониторинг 
			//	т.е. отключить это монитор и реализовать загрузку данных в виджеты с пагинацией
				
			$scope.evJdro.status = res.attrib.status;
			var id = res.attrib.node.split(".")[1];
			$scope.evJdro.id = id;
				//----------- вот это все нужно будет продумать сделать стеком на опрделенное количество записей
			$scope.events[id] = $scope.events[id] || [];
			$scope.events[id].unshift(res);
				//----------- вот это все нужно будет продумать сделать стеком на опрделенное количество записей
				//----------unshift добовляем в голову списка
			$scope.allEvents = $scope.allEvents || [];
			$scope.allEvents.unshift(res);	
			
			$scope.$apply();
		});
		
		//---------------данный блок нужно будет перенести в контроллер диррективы events что бы он там крутился
		$scope.$root.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$scope.curentId = $state.params.id;
		
		});
		$scope.getCl = function(item){
			return item.attrib.status == 1 ? 'indicat-onn':'indicat-off';
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
		
  });
