'use strict';

/**
 * @ngdoc function
 * @name netmonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the netmonApp
 */
angular.module('netmonApp')
  .controller('MainCtrl', function (nodeServ, $scope) {
		$scope.selIt;
		$scope.nodes;
		$scope.evJdro={}; $scope.evJdro.status ="1";
		
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
			$scope.evJdro.id = res.attrib.node.split(".")[1];
			$scope.$apply();
		});
  });
