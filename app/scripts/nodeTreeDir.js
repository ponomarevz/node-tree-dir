//------------------рсивная дирректива построения дерева		
	
	angular.module('netmonApp')
		.directive('nodes', function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			nodes: '=',
			evjdro: '='
			
		},
		template: "<ul><node ng-repeat='item in nodes' item='item' evjdro='evjdro'></ul>"
		
	}
})

.directive('node', function ($compile) {
	return {
		restrict: "E",
		replace: true,
		scope: {
			item: '=',
			evjdro: '='
			
			
		},
		template: "<li class='menu' ng-switch on='item.attrib.type'>"
					+"<span ng-switch-when='Group' style='color: orange;' class='glyphicon glyphicon-th-list toogle-b'></span>"
					+"<small><span ng-class='getCl(item, evjdro )' class='glyphicon glyphicon-record' ng-switch-when='Device'></span></small>"
					+"<span ng-switch-when='Device' class='glyphicon glyphicon-cog'></span>"
					+"<span ng-switch-when='Device' class='caption'  ng-class='{activet: getActivate(item)}' ng-click=(toState(item))>{{item.attrib.caption}} {{item.attrib.id}} {{item.attrib.hostname}} {{item.attrib.ip}}</span>"
					+"<span ng-switch-when='Group' class= 'toogle-b' ng-class='{activet: getActivate(item)}' ng-click=(toState(item))>{{item.attrib.caption}} {{item.attrib.id}}</span>"
					+"<span ng-if='getActivate(item)' style='float: right' class='down-b glyphicon glyphicon-arrow-down'></span>"
					+"<div ng-if-start='getActivate(item)' class='submenu'>"
						+"<p ng-click='clBut(item)' class='sub-b'>Редактировать узел</p>"
						+"<p ng-click='clBut(item)' class='sub-b'>Добавить узел</p>"
						+"<p ng-click='clBut(item)' class='sub-b'>Удалить узел</p>"
					+"</div>"
					+"<div ng-if-end class='vidget'>asdasdasd</div>"
					+"<span>{{item.attrib.name}}</span>"
				+"</li>",
		link: function (scope, element, attrs) {
				
			if (scope.item.attrib.type == 'Group') {
				
					var templ = "<nodes ng-class='getActivFol(item)' class='toogle' id='item.attrib.id' evjdro='evjdro' nodes='item.nodes'></nodes>"
					element.append(templ); 

				$compile(element.contents())(scope);
			}				
				//-----------обработчики событий для клика мышкой-----------
				element.on('click', function(event) {
					var el, el_m;
					var ev_el = angular.element(event.target);
					//angular.element(document.body).find('.tree .sub-active').toggleClass('sub-active');
					//----------обработчик для разворота узлов вложеного дерева---------------
					if (  ev_el.hasClass('toogle-b') ) {
						//el = event.currentTarget.querySelector('.toogle');
						//el_m = angular.element(el);
						//el_m.toggleClass('active');
					};
					
					//-----------обработчик для разворота меню суб меню------ 
					if (  ev_el.hasClass('down-b') ) {
					//по шаблону сосед идет суб меню, но ангулар генерирует свои
					//комментарии, которые попадают в соседи для диррективы ng-if
						
						el = event.target.nextSibling.nextSibling.nextSibling; 
						
						ev_el.toggleClass('b-active glyphicon-arrow-down glyphicon-arrow-up');
						el_m = angular.element(el);
						el_m.toggleClass('sub-active'); //----------разворачиваем sub-menu
					}
					event.stopPropagation();
				});
				
				
			
			
		},
		controller: function($scope, $state) {
			
			 //------каждый вложенный элемент создает свой скоп поэтому полный путь добавляем в корневой скоп
			//--------начальная инициализация
			var rout = $state.params.rout ? $state.params.rout.split(".") : "";
				$scope.$root.fullState = rout ||  [];
			//изменение состояния	
			$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
				angular.element(document.body).find('.sub-active.vidget').toggleClass('sub-active'); 
				angular.element(document.body).find('.tree .sub-active').toggleClass('sub-active');
				 
			});
			$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
				console.log("change");
				
				rout = $state.params.rout ? $state.params.rout.split(".") : "";
				$scope.$root.fullState = rout ||  [];
			});
				
						
			//----------------- реагирует на клик мішки на єлементе 
			//----------и строит маршрут состояния и переводит приложение в него
			$scope.toState = function(item) {
				var curState = item.parentId;
				var curId = item.attrib.id;
					console.log("parId   " + item.parentId);
				var fullState;
					
					if (item.attrib.type == 'Group') {
						
						var index = $scope.$root.fullState.indexOf(curId);
						if (index <= -1) {
							curState = curState.concat(item.attrib.id);
						} else {
							//---
							$scope.$root.fullState.splice(index, 1);
						}
					}
					//-------- curState содержит id всех перентов выделенного итема
					//--------curStateFilter содержит id всех перентов которых нет в $scope.$root.fullState
					//---------$scope.$root.fullState содержит id всех открытых вложеных груп нодов
					//----------fullState содержит строку которая будет хаписана в хистори адресною строку браузера
					var curStateFilter = curState.filter(function(state){
						return $scope.$root.fullState.indexOf(state) <= -1;
					})
					
					console.log("curstF  " + curStateFilter);
					console.log("scopeFst  " + $scope.$root.fullState);
				$scope.$root.fullState = $scope.$root.fullState.concat(curStateFilter);
				console.log("sss  " + $scope.$root.fullState)
				fullState =  $scope.$root.fullState.join('.');
				
				console.log(fullState);
				$state.go('monitor.root', {'rout': fullState, 'id': item.attrib.id});
			};
			
			//----------нужно для подсвечивания активного элемента
			$scope.getActivate = function(item) {
					//console.log("оценка производительности");
				return $state.params.id === item.attrib.id;
			}
			//----------нужно для отображения раскрытых вкладок------------
			$scope.getActivFol = function(item) {
					//console.log("jw");
				//---------подумать как убрать две строчки кода
				
				//var rout = ($state.params.rout) ? $state.params.rout.split(".") : [];
				var clas = ($scope.$root.fullState.indexOf(item.attrib.id) > -1) ? 'toogle active' : "toogle";
					return clas;
			}
			//-----------быстро для индикации подсветки онлайн статуса----------
			$scope.getCl = function(item, evjdro) {
			//	console.log("еще производит");
				if (item.attrib.id == evjdro.id) {
					item.attrib.cl = evjdro.status == 1 ? 'indicat-onn':'indicat-off'
				}
				return item.attrib.cl;
			}
			$scope.clBut = function(item){
				console.log("ddd")
				angular.element(document.body).find('.vidget').toggleClass('sub-active'); 
			}
			//--------------отключаем лишний вотчер нужно тестировать--------
			var watch = $scope.$watch('getActivate(item)', function(newV, oldW) {
				console.log("dddddd");
			});
			watch();
		}
	}
})