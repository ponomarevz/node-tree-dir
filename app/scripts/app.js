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
    'ngAnimate'
  ]);
  
  angular
  .module('netmonApp').controller('mainCtrl', function(){
	alert('main');
  })
