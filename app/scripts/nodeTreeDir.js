//------------------рсивная дирректива построения дерева		
	
	angular.module('netmonApp')
		.directive('nodes', function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			nodes: '=',
			evjdro: '=',
			id: '@' //------------ передаем уникальный 
			
		},
		template: "<ul><node rootid = 'id' ng-repeat='item in nodes' item='item' evjdro='evjdro'></ul>"
		
	}
})

.directive('node', function ($compile) {
	return {
		restrict: "E",
		replace: true,
		scope: {
			item: '=',
			evjdro: '=',
			rootid: '='
			
			
		},
		template: "<li class='menu' ng-switch on='item.attrib.type'>"
					+"<span ng-switch-when='Group' style='color: orange;' class='glyphicon glyphicon-th-list toogle-b'></span>"
					+"<small><span ng-class='getCl(item, evjdro )' class='glyphicon glyphicon-record' ng-switch-when='Device'></span></small>"
					+"<span ng-switch-when='Device' class='glyphicon glyphicon-cog'></span>"
					
					+"<span ng-switch-when='Device' id={{item.attrib.id}} class='caption'  ng-click=(toState(item))>{{item.attrib.caption}} {{item.attrib.id}} {{item.attrib.hostname}} {{item.attrib.ip}}</span>"
					+"<span ng-switch-when='Group' id={{item.attrib.id}} class= 'caption' ng-click=(toState(item))>{{item.attrib.caption}} {{item.attrib.id}}</span>"
					
					+"<span style='float: right;' class='down-b glyphicon glyphicon-arrow-down'></span>"
					+"<div class='submenu'>"
						+"<p ng-click='clBut(item)' class='sub-b'>Редактировать узел</p>"
						+"<p ng-click='clBut(item)' class='sub-b'>Добавить узел</p>"
						+"<p ng-click='clBut(item)' class='sub-b'>Удалить узел</p>"
					+"</div>"
					+"<div ng-if= 'getActivate(item)' class='vidget'>asdasdasd</div>"
					+"<span>{{item.attrib.name}}</span>"
				+"</li>",
		link: function (scope, element, attrs) {
				
			if (scope.item.attrib.type == 'Group') {
				
					var templ = "<nodes id={{item.attrib.id+'toggle'}} class='toogle' evjdro='evjdro' nodes='item.nodes'></nodes>"
					element.append(templ); 

				$compile(element.contents())(scope);
			}				
				//-----------обработчики событий для клика мышкой-----------
				element.on('click', function(event) {
					var el, el_m;
					var ev_el = angular.element(event.target);
					
					//-----------обработчик для разворота меню суб меню------ 
					if (  ev_el.hasClass('down-b') ) {
					//по шаблону сосед идет суб меню, но ангулар генерирует свои
					//комментарии, которые попадают в соседи для диррективы ng-if
						
						el = event.target.nextSibling; 
						
						ev_el.toggleClass('b-active glyphicon-arrow-down glyphicon-arrow-up');
						el_m = angular.element(el);
						el_m.toggleClass('sub-active'); //----------разворачиваем sub-menu
					}
					event.stopPropagation();
				});
				
				
			
			
		},
		controller: function($scope, $state) {
			
			
				//---------------------  функция инициализации нодов -------------------
				function initNode() {
					//----------------получаем корневой элемент и будем от него отталкиваться
					var rootAngularElem = angular.element(document.body.querySelector('#' + $scope.$root.nodeTreeDir.id )); 
					
					var rout = $state.params.rout ? $state.params.rout.split(".") : "";
					var elId = '#' + $state.params.id || 0;
										
					$scope.$root.fullState = rout ||  [];
					//---------------отключаем и включаем выдиление для текущего элемента
					rootAngularElem.find('.activet').toggleClass('activet');
					rootAngularElem.find('.active').toggleClass('active');
					rootAngularElem.find('.b-visible').toggleClass('b-visible');
					
					rootAngularElem.find(elId).addClass('activet');
						
					for (var i in rout) {
						var elIdGr = '#' + rout[i] + 'toggle';
						rootAngularElem.find(elIdGr).addClass('active');
					};
					
					var activ_el = rootAngularElem.find('.activet');
					angular.element(activ_el.next('span')[0]).toggleClass('b-visible');
					
				}
				
				
			
			//------каждый вложенный элемент создает свой скоп поэтому полный путь добавляем в корневой скоп
			//изменение состояниz вешаю на rootScope потому что в противном случае он будет добавлять на все вложенные скопы
			//используется принцип делигирования событий 1 слушатель вешается на корневом скопе и она же будет обновлять
			//некоторые элементы пользовательского интерфейса такие как изменение класа активных элементов, такая ситуация противоречит 
			//концепции декларативного программирования принятая в Ангулар, но при размере дерева в несколько сотен декларативный подход приводит
			//к значительному снижению производительности. Решение основно на том что изменение классов некоторых элементов приводит к изменению состояние приложения может изменятся только в том случае когда изменятеся 
			//состояние приложения.
			
			if (!$scope.$root.nodeTreeDir || !$scope.$root.nodeTreeDir.StateWatch) {
				//----------далее изменить все, что записывается в rootScope изменит в соответствии с NameSpace, а именно nodeTreeDir 
				$scope.$root.nodeTreeDir = {};
						$scope.$root.nodeTreeDir.id = $scope.rootid; // получаем название корневого ІD-ишника, будет віступатьть 
						var rootAngularElem = angular.element(document.body.querySelector('#' + $scope.$root.nodeTreeDir.id )); //---------сюда впихнуть с учетом CSS name space
						console.log($scope.rootid);
				//----------для класов ввести также NameSpace
												
				$scope.$root.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
					//-------------класс для субактив нужно перед изменением состояния его плавно свернуть
					rootAngularElem.find('.sub-active.vidget').toggleClass('sub-active'); 
					rootAngularElem.find('.sub-active').toggleClass('sub-active');
				});
				
				$scope.$root.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
					initNode();
				});
				
				$scope.$root.nodeTreeDir.StateWatch = true; 
				
			}
			
			initNode(); //---начальная загрузка необходимо подумать как это перенести отсюда в момент когда шаблон скомпилируется
				
						
			//----------------- реагирует на клик мішки на єлементе 
			//----------и строит маршрут состояния и переводит приложение в него
			$scope.toState = function(item) {
				var curState = item.parentId;
				var curId = item.attrib.id;
					
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
					
					
				$scope.$root.fullState = $scope.$root.fullState.concat(curStateFilter);
				
				fullState =  $scope.$root.fullState.join('.');
				$state.go('monitor.root', {'rout': fullState, 'id': item.attrib.id});
			};
			
			//----------нужно для подсвечивания активного элемента
			$scope.getActivate = function(item) {
					//console.log("оценка производительности");
				return $state.params.id === item.attrib.id;
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
		
				angular.element(document.body).find('.vidget').toggleClass('sub-active'); 
			}
			//--------------отключаем лишний вотчер нужно тестировать--------
			
			var watch1 = $scope.$watch('item.attrib.id', function(newV, oldW) {
				
			});
			var watch2 = $scope.$watch('item.attrib.hostname', function(newV, oldW) {
				
			});
			var watch3 = $scope.$watch('item.attrib.ip', function(newV, oldW) {
				
			});
			//{{item.attrib.caption}} {{item.attrib.id}} {{item.attrib.hostname}} {{item.attrib.ip}}
			watch1(); watch2(); watch3();
		}
	}
})