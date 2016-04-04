'use strict';

/**
 * @ngdoc function
 * @name netmonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the netmonApp
 */
angular.module('netmonApp')
  .controller('MainCtrl', function (nodeServ, $scope, $state) {
		$scope.selIt;
		$scope.nodes;
		$scope.evJdro={}; $scope.evJdro.status ="1";
		$scope.events = {};
		$scope.events.curentId = $state.params.id;
		
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
