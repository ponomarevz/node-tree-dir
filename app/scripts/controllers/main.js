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
		//----------список виджетов
		if (!$localStorage.dashboards) {
			//---------сли нет в $localStorage.dashboards инициализируем по default
			$scope.dashboards = [
				{  	col: 0,
					row: 0,
					sizeY: 2,
					sizeX: 2,
					name: "Widget 1"
				}, {
					col: 3,
					row: 0,
					sizeY: 1,
					sizeX: 4,
					name: "Widget 2"
				}, {
					col: 3,
					row: 0,
					sizeY: 1,
					sizeX: 4,
					name: "Widget 3"
				}
			
			];
		} else { //--------инче инициализируем с $localStorage
			$scope.dashboards = $localStorage.dashboards;
		}
		
		//------------инициализация greedster
		$scope.selIt;
		$scope.nodes;
		$scope.evJdro={}; $scope.evJdro.status ="1";
		$scope.events = {};
		//----------- если работает пересмотреть ))))
		$scope.events.curentId = $state.params.id;
		
		
		
		$scope.setCurTreeId = function() {
			//alert("asdas");
			//----потестить диррективу stop propogation в директиве
		}
		
		nodeServ.getNodes().then(function(data){
			$scope.nodes = data;
			console.log(data);
			console.log("ok");
		});
		
		console.log("sss");
		$scope.selNode = function(item) {
			$scope.selIt = item;
		};
		
		$scope.isSelNode = function(item) {
			return $scope.selIt === item;
		};
		
		nodeServ.createConection();
		
		$scope.$on('eventJadro', function(event, res) {
			//					console.log("--------------------")
			$scope.evJdro.status = res.attrib.status;
			var id = res.attrib.node.split(".")[1];
			$scope.evJdro.id = id;
			
			$scope.events[id] = $scope.events[id] || [];
			$scope.events[id].push(res);
			
			console.log(res);
			
			$scope.$apply();
		});
  });
