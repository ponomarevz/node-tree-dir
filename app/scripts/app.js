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
						controller: ['nodeServ', '$scope', '$state', function(nodeServ, $scope, $state){
							//-------------- убрать отсюда
							$scope.itemType = [
								{title: "Група" , zn: 'GROUP' },
								{title: "Устройство" , zn: 'DEVICE' }
							];
							
							$scope.addItem = function(itemform, item){
								//$scope.curentId Будет парентом нужно если не если Група то ок добавляем сюда если не група то тоже ок смотрим кто у него парент и вставляем туда
								if(itemform.$valid) {
									//----- посылаем запрос на сервер для добавления элемента
									nodeServ.addNodes(item, $scope.curentId).then(function(data){
										//----- в случае успеха делаем переход на состояние
										//----- эммитируем событие на верх скопа, для того что бы обновить модель
											$scope.returnState(); //----------- переходим в исходное состояние
										$scope.$emit('updatenodes'); //--------данный метод нужен для отправки события на верхний скоп для того чтобы там сгенерировать обработчик обновления модели
									}, function(err){
										//-----в случае неудачи говорим что не так
										alert(err);
									});

								}
								
							}
							//-------------- убрать отсюда
							//---------кнопка возврата состояния
							$scope.returnState = function() {
								$state.go('dash.root');							
							};

						}]
					}
				}
			});
			
			
	}]);