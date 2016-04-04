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
		//console.log($scope.$parent.nodes);
		//$scope.text = JSON.stringify($scope.$parent.nodes['Node.' + $scope.id]);
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
			.state('monitor', {
				url:'/monitor',
				views: {
					'left-widget@' : {
						templateUrl: 'views/main.html'
					}
				}
				//	resolve доделать
				
			})
			.state('dash', {
				url:'/dash',
				views: {
					'main-centr@' : {
						templateUrl:'views/dash.tpl.html',
					}
				}
				//	resolve доделать
				
			})
			.state('monitor.root', {
				url:'/:rout/:id',
				views: {
					'right-widget@' : {
						templateUrl:'views/events.tpl.html',
						controller: 'eventsCtrl'
					}
				},
				onEnter: function() {
				
				}
			});
			
			
	})