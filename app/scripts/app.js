'use strict';

/**
 * @ngdoc overview
 * @name netmonApp
 * @description
 * # netmonApp
 *
 * Main module of the application.
 */
angular
  .module('netmonApp', [
    'ngAnimate',
	'ui.router'
  ]);
  
  angular
  .module('netmonApp')
  .controller('centrViewCtrl', function($scope, $rootScope, $state){
		$scope.id = $state.params.id;
		//----так делать нельзя но по быстрому
		console.log($scope.$parent.nodes);
		$scope.text = JSON.stringify($scope.$parent.nodes['Node.' + $scope.id]);
  }).

  config(function($stateProvider) {
		
		//----------------	настраиваем роутер состояний приложения -----------------------
		$stateProvider
		.state('about', {
				url:'/about',
				views: {
					'mainView@' : {
						templateUrl:'views/about.html',
					},
				},
			})
			.state('menu', {
				url:'/menu/:rout/:id',
				views: {
					'centrView@' : {
						templateUrl:'views/main.tpl.html',
						controller: 'centrViewCtrl'
					}
				},
				onEnter: function() {
				
				}
			});
			
			
	})