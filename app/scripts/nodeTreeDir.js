//------------------рсивная дирректива построения дерева		
	
	angular.module('netmonApp')
		.directive('nodes', function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			nodes: '=',
			class: '='
		},
		template: "<ul><node ng-repeat='item in nodes' item='item'></node></ul>"
		
	}
})

.directive('node', function ($compile) {
	return {
		restrict: "E",
		replace: true,
		scope: {
			item: '=',
			class: '='
			
		},
		template: "<li class='menu' ng-switch on='item.attrib.type'>"
					+"<span ng-switch-when='Group' style='color: orange;' class='glyphicon glyphicon-th-list toogle-b'></span>"
					+"<span ng-switch-when='Device' class='glyphicon glyphicon-cog'></span>"
					+"<span ng-switch-when='Device' class='caption'  ng-class='{activet: getActivate(item)}' ng-click=(toState(item))>{{item.attrib.caption}} {{item.attrib.id}} {{item.attrib.hostname}} {{item.attrib.ip}}</span>"
					+"<span ng-switch-when='Group' class= 'toogle-b' ng-class='{activet: getActivate(item)}' ng-click=(toState(item))>{{item.attrib.caption}} {{item.attrib.id}}</span>"
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
				
					var templ = "<nodes ng-class='getActivFol(item)' class='toogle' id='item.attrib.id' nodes='item.nodes'></nodes>"
					element.append(templ); 

				$compile(element.contents())(scope);
			}				
				//-----------обработчики событий для клика мышкой-----------
				element.on('click', function(event) {
					var el, el_m;
					var ev_el = angular.element(event.target);
					//----------обработчик для разворота узлов вложеного дерева---------------
					if (  ev_el.hasClass('toogle-b') ) {
						el = event.currentTarget.querySelector('.toogle');
						el_m = angular.element(el);
						el_m.toggleClass('active');
					};
					
					//-----------обработчик для разворота меню суб меню------ 
					if (  ev_el.hasClass('down-b') ) {
					//по шаблону сосед идет суб меню, но ангулар генерирует комментарий для диррективы ng-if
						el = event.target.nextSibling.nextSibling.nextSibling; 
						
						ev_el.toggleClass('b-active glyphicon-arrow-down glyphicon-arrow-up');
						el_m = angular.element(el);
						el_m.toggleClass('active'); //----------разворачиваем sub-menu
					}
					event.stopPropagation();
				});
				
				//-------------обработчики событий для Drag Drop-----------------
				element.on("mousedown", function(event){
					console.log(element);
					var ev_el = angular.element(event.target);
					if (ev_el.hasClass('activet')) {
						
						var elem = ev_el.clone(); 
						var el = elem[0];
						el.style.position = 'absolute';
						moveAt(event);
						// переместим в body,  position:relative
						document.body.appendChild(el);
event.stopPropagation();
						el.style.zIndex = 1000; 

						
						function moveAt(event) {
							el.style.left = event.pageX - el.offsetWidth / 2 + 'px';
							el.style.top = event.pageY - el.offsetHeight / 2 + 'px';
						}
						
						document.onmousemove = function(event) {
								moveAt(event);
						}
						
						// 4. отследить окончание переноса
						elem.on('mouseup', function() {
							console.log("ssssssssssssssss");
							document.onmousemove = null;
							//elem[0].onmouseup = null;
							elem.remove();
						});
					}
				});
			
			
		},
		controller: function($scope, $state) {
				//console.log("Віп первім");
			$scope.state = $state;
			//---------- реагирует на клик мішки на єлементе и строит маршрут состояния
			$scope.toState = function(item) {
				$state.go('menu', {'rout': item.parentId, 'id': item.attrib.id});
			};
			
			$scope.getActivate = function(item) {
				//console.log("оценка производительности");
				return $state.params.id === item.attrib.id;
			}
			
			$scope.getActivFol = function(item) {
				if (!$state.params.rout) {return false};
				var rout =  $state.params.rout.split(".");
				var clas = (rout.indexOf(item.attrib.id) > -1) ? 'toogle active' : "toogle";
					console.log(clas);
					return clas;
			}
		}
	}
})