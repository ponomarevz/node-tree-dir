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
		template: "<li ng-switch on='item.attrib.type'>"
					+"<span ng-switch-when='Group' style='color: orange;' class='glyphicon glyphicon-th-list toogle-b'></span>"
					+"<span ng-switch-when='Device' class='glyphicon glyphicon-cog'></span>"
					+"<span ng-switch-when='Device' class='caption'  ng-class='{activet: getActivate(item)}' ng-click=(toState(item))>{{item.attrib.caption}} {{item.attrib.id}} {{item.attrib.hostname}} {{item.attrib.ip}}</span>"
	+"<span ng-switch-when='Group' class= 'toogle-b' ng-class='{activet: getActivate(item)}' ng-click=(toState(item))>{{item.attrib.caption}} {{item.attrib.id}}</span>"
					+"<span>{{item.attrib.name}}</span>"
				+"</li>",
		link: function (scope, element, attrs) {
				
			if (scope.item.attrib.type == 'Group') {
										
				
					var templ = "<nodes ng-class='getActivFol(item)' class='toogle' id='item.attrib.id' nodes='item.nodes'></nodes>"
					element.append(templ); 

				$compile(element.contents())(scope);
									
				element.on('click', function(event) {
						
					if (  angular.element(event.target).hasClass('toogle-b') ) {
						var el = event.currentTarget.querySelector('.toogle');
						el_m = angular.element(el);
						el_m.toggleClass('active');
					};
					event.stopPropagation();
				})
			}
			
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
				var rout =  $state.params.rout.split(".");
				var clas = (rout.indexOf(item.attrib.id) > -1) ? 'toogle active' : "toogle";
					console.log(clas);
					return clas;
			}
		}
	}
})