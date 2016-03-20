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
					+"<span ng-switch-when='Device'>{{item.attrib.caption}} {{item.attrib.id}} {{item.attrib.hostname}} {{item.attrib.ip}}</span>"
					+"<span class= 'toogle-b' ng-switch-when='Group'>{{item.attrib.caption}} {{item.attrib.id}}</span>"
					+"<span>{{item.attrib.name}}</span>"
				+"</li>",
		link: function (scope, element, attrs) {
		
			if (scope.item.attrib.type == 'Group') {
									
				element.append("<nodes class = 'toogle' nodes='item.nodes'></nodes>"); 
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
			
		}
	}
})