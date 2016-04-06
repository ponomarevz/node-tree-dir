'use strict';

/**
 * @ngdoc function
 * @name netmonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the netmonApp
 */
angular.module('netmonApp')
  .controller('MainCtrl', function (nodeServ, $scope, $state,  $localStorage) {
		
		
	//----------------------------настрой грид системы---------------
		$scope.grOpt = { 
			pushing: true, // whether to push other items out of the way on move or resize
			floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
			swapping: false,
			draggable: { 
				enabled: true,  
				handle: '.panel-heading',
				stop: function(event, $element, widget) {
						//alert($scope.dashboards[0].col);
						//------------разделить на методы отдельного сервиса сделать Save Dashboard
						//------------сделать GetDashboard
						$localStorage.dashboards = $scope.dashboards;
						console.log($localStorage.dashboards);
				}
				} 
			};
			//-----------типы виджетов и пути к их темплейтам
			$scope.vidgetesTemplate = {
				'nodesTree': 'views/nodesTree.tpl.html',
				'events': 'views/events.tpl.html',
				'actions': 'views/actions.tpl.html'
				
			};
		//----------список виджетов--------------
		if (!$localStorage.dashboards) {
			//---------если нет в $localStorage.dashboards инициализируем по default
			
			$scope.dashboards = [
				{  	col: 0,
					row: 0,
					sizeY: 2,
					sizeX: 2,
					name: 'Widget 1',
					//---выше необходимо для настройки отображения в grsdster
					type: 'nodesTree' // необходимо для выбора нужного темплейта
				}, {
					col: 3,
					row: 0,
					sizeY: 1,
					sizeX: 4,
					name: 'Widget 2',
					type: 'events'
				}, {
					col: 3,
					row: 0,
					sizeY: 1,
					sizeX: 4,
					name: 'Widget 3',
					type: 'actions'
				}
			
			];
		} else { //--------инче инициализируем с $localStorage
			$scope.dashboards = $localStorage.dashboards;
		}
		
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
		}
		
		nodeServ.getNodes().then(function(data){
			$scope.nodes = data;
			
		});
		
		
				
		nodeServ.createConection();
		
		$scope.$on('eventJadro', function(event, res) {
			//					console.log("--------------------")
			$scope.evJdro.status = res.attrib.status;
			var id = res.attrib.node.split(".")[1];
			$scope.evJdro.id = id;
			
			$scope.events[id] = $scope.events[id] || [];
			$scope.events[id].push(res);
						
			$scope.$apply();
		});
		
		//---------------данный блок нужно будет перенести в контроллер диррективы events что бы он там крутился
		$scope.$root.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$scope.curentId = $state.params.id;
		
		});
		$scope.getCl = function(item){
			return item.attrib.status == 1 ? 'indicat-onn':'indicat-off';
		}
		//---------------данный блок нужно будет перенести в контроллер диррективы events что бы он там крутился
  });
