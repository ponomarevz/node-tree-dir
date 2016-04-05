'use strict';

/**
 * @ngdoc function
 * @name netmonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the netmonApp
 */
angular.module('netmonApp')
  .controller('MainCtrl', function (nodeServ, $scope, $state,  $timeout) {
		
		
		$timeout(function() {
    enabled = true;

    // timeout required for some template rendering
    $el.ready(function() {
        if (enabled !== true) {
        return;
    }
    // disable any existing draghandles
    for (var u = 0, ul = unifiedInputs.length; u < ul; ++u) {
        unifiedInputs[u].disable();
        unifiedInputs[h] = new GridsterTouch($dragHandles[h], mouseDown, mouseMove, mouseUp);
        unifiedInputs[h].enable();
    }

    enabled = true;
    });
};
		$scope.gridsterOpts = {
  
			margins: [20, 20],
			columns: 4,
			draggable: {
				handle: '.panel-title'
			}
		};
		//----------список виджетов
		$scope.dashboards = [
			{  	col: 0,
				row: 0,
				sizeY: 3,
				sizeX: 3,
					name: "Widget 1"
				}, {
					col: 3,
					row: 0,
					sizeY: 3,
					sizeX: 3,
					name: "Widget 2"
				}
			
		];
		
		
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
