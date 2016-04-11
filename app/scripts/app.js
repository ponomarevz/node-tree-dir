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
	'ui.router',
	'gridster',
	'ngStorage'
  ]);
  
  angular
  .module('netmonApp')
  .controller('centrViewCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state){
		$scope.id = $state.params.id;
		//----так делать нельзя но по быстрому
		//console.log($scope.$parent.nodes);
		//$scope.text = JSON.stringify($scope.$parent.nodes['Node.' + $scope.id]);
  }]).

  config(['$stateProvider', function($stateProvider) {
		
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
			.state('dash', {
				url:'/dash',
				views: {
					'main-centr@' : {
						templateUrl:'views/dash.tpl.html',
						controller: 'dashboardCtrl'
					}
				}
				//	resolve доделать
				
			})
			.state('monitor', {
				url:'/monitor'
				
			})
			.state('dash.root', {
				url:'/:rout/:id'
			})
			.state('dash.root.add', {
				url:'/add',
				//----------------вложенній ui-view='dash-right-slide' для вложеного состояния add в состоянии dash 
				views: {
					'dash-right-slide@dash' : {
						templateUrl:'views/itemAdd.tpl.html',
						controller: function($scope){
							
							$scope.itemType = [
								{title: "Група" , zn: 'Group' },
								{title: "Устройство" , zn: 'Device' }
							];
							
						}
					}
				}
			});
			
			
	}]);