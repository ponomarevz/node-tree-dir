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
  .module('netmonApp').controller('mainCtrl', function(){
	alert('main');
  }).

  config(function($stateProvider) {
		
			
		$stateProvider
		.state('about', {
				url:'/about',
				views: {
					'centrV@' : {
						templateUrl:'views/about.html',
					},
				},
			})
			.state('menu', {
				url:'/dd:id',
				views: {
					
				},
				onenter: function() {
					alert("dsfsd");
				}
			})
			
			
	})