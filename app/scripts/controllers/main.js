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
		
		nodeServ.getNodes().then(function(data){
			$scope.nodes = data;
			console.log("ok");
		});
		
		
		$scope.selNode = function(item) {
			$scope.selIt = item;
		};
		
		$scope.isSelNode = function(item) {
			return $scope.selIt === item;
		};
		
  });
