//------------------рсивная дирректива построения дерева		
	
	angular.module('netmonApp')
		.directive('nodes', function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			nodes: '=',
			evjdro: '=',
			class: '='
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
			evjdro: '=',
			class: '='
			
		},
		template: "<li class='menu' ng-switch on='item.attrib.type'>"
					+"<span ng-switch-when='Group' style='color: orange;' class='glyphicon glyphicon-th-list toogle-b'></span>"
					+"<span ng-switch-when='Device' class='glyphicon glyphicon-cog'></span>"
					+"<span ng-switch-when='Device' class='caption'  ng-class='{activet: getActivate(item)}' ng-click=(toState(item))>{{item.attrib.caption}} {{item.attrib.id}} {{item.attrib.hostname}} {{item.attrib.ip}}</span>"
					+"<span ng-switch-when='Group' class= 'toogle-b' ng-class='{activet: getActivate(item)}' ng-click=(toState(item))>{{item.attrib.caption}} {{item.attrib.id}}</span>"
					+"<small><span ng-class='getCl(item, evjdro )' class='glyphicon glyphicon-record' ng-switch-when='Device'></span></small>"
					+"<span ng-if='getActivate(item)' style='float: right' class='down-b glyphicon glyphicon-arrow-down'></span>"
					+"<div ng-if='getActivate(item)' class='submenu'>"
						+"<p>субменю (загрузим шаблончик)</p>"
						+"<p>Удалить</p>"
						+"<p>что то еще</p>"
					+"</div>"
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
						el_m.toggleClass('active'); //----------разворачиваем sub-menu
					}
					event.stopPropagation();
				});
				
				//-------------обработчики событий для Drag Drop-----------------
				element.on("mousedown", function(event){
					//console.log(element);
					var ev_el = angular.element(event.target);
					if (ev_el.hasClass('activet')) {
						
						var elem = ev_el.clone(); 
						var el = elem[0];
						el.style.position = 'absolute';
						moveAt(event);
						// переместим в body
						document.body.appendChild(el);
							event.stopPropagation(); //---важно----
						el.style.zIndex = 1000; 

						
						function moveAt(event) {
							el.style.left = event.pageX - el.offsetWidth / 2 + 'px';
							el.style.top = event.pageY - el.offsetHeight / 2 + 'px';
						}
						
						document.onmousemove = function(event) {
								moveAt(event);
						}
						
						// 4. отследить окончание переноса
						elem.on('mouseup', function(event) {
								//console.log(document.elementFromPoint(100, 100)); //----так я найду элемент над которым мыш 
							document.onmousemove = null;
							elem.remove();
						});
					}
				});
			
			
		},
		controller: function($scope, $state) {
				
				var rout;
				if ($state.params.rout) { 
					rout = $state.params.rout.split(".")
				};
				
				console.log("Віп первім");
				//----------запоминаем все открытые вкладки
				//console.log($state.params.rout);
				//--------- плохое решение наверное нужен роот скоп но работает
				
				$scope.$root.fullState = rout ||  []; //------каждый вложенный элемент создает свой скоп поэтому полный путь добавляем в корневой скоп
			
			//----------------- реагирует на клик мішки на єлементе 
			//----------и строит маршрут состояния и переводит приложение в него
			$scope.toState = function(item) {
				var curState = item.parentId;
				var fullState;
					var curId = item.attrib.id;
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
				
				console.log(fullState);
				$state.go('main.menu', {'rout': fullState, 'id': item.attrib.id});
			};
			
			//----------нужно для подсвечивания активного элемента
			$scope.getActivate = function(item) {
					//console.log("оценка производительности");
				return $state.params.id === item.attrib.id;
			}
			//----------нужно для отображения раскрытых вкладок------------
			$scope.getActivFol = function(item) {
			//		console.log("jw");
				if (!$state.params.rout) {return false};
				var rout =  $state.params.rout.split(".");
				var clas = (rout.indexOf(item.attrib.id) > -1) ? 'toogle active' : "toogle";
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
			//--------------отключаем лишний вотчер нужно тестировать--------
			var watch = $scope.$watch('getActivate(item)', function(newV, oldW) {
				console.log("dddddd");
			});
			watch();
		}
	}
})