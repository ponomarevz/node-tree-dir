'use strict';

/**
 * @ngdoc function
 * @name netmonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the netmonApp
 */
angular.module('netmonApp')
  .controller('eventsCtrl', function ($scope, $state) {
		
		$scope.curentId = $state.params.id;
	$scope.getCl = function(item){
		return item.attrib.status == 1 ? 'indicat-onn':'indicat-off';
	}
});