'use strict';
(function(){
	
	angular.module('netmonApp')
		.service('dashServ', dashServ);
		
		function dashServ($localStorage) {
			
			var dash = {};
			//----------------инициализация существующих типов виджетов и их путей к темплейтам
			dash.vidgetesTemplate = {
				'nodesTree': {'type':'nodesTree', 'url': 'views/nodesTree.tpl.html', 'name': 'Дерево нодов'},
				'events': {'type':'events','url': 'views/events.tpl.html', 'name': 'События по ноду'},
				'actions': {'type':'actions','url': 'views/actions.tpl.html', 'name': 'Все события'},
				'addVidget': {'type':'addVidget','url': 'views/addVidget.tpl.html', 'name': 'Добавить виджет'}
			};
			
			//----------------инициализация параметров грид системы Dash панели
			dash.grOpt = { 
				pushing: true, 
				floating: true, 
				swapping: false,
				draggable: { 
					enabled: true,  
					handle: '.panel-heading', //-----------очень выжный параметр говорит за что нам тянуть panel
					stop: function(event, $element, widget) {
						//alert($scope.dashboards[0].col);
						//------------разделить на методы отдельного сервиса сделать Save Dashboard
						//------------сделать GetDashboard
						$localStorage.dashboards = dash.dashboards; // сделать методами save  и т.д.
						//console.log($localStorage.dashboards);
					}
				} 
			};
			//------------ интерфейсный метод сервиса dashServ для инициализации параметров Dash панели
			//------------ сейчас сделана заготовка с LocalStorage далее сделать с AJAX ---- когда будет решен 
			//------------ вопрос как мы будем хранить данные о параметрах  Dash панели ----------------
			this.initDash = function() {
				//----------список виджетов--------------
				if (!$localStorage.dashboards) {
				//---------если нет в $localStorage.dashboards инициализируем по default
					dash.dashboards = [
						{  	col: 0,
							row: 0,
							sizeY: 2,
							sizeX: 2,
							name: 'Список узлов',
							//---выше необходимо для настройки отображения в grsdster
							type: 'nodesTree' // необходимо для выбора нужного темплейта
						}, {
							col: 3,
							row: 0,
							sizeY: 1,
							sizeX: 4,
							name: 'События по выбранному узлу',
							type: 'events'
						}, {
							col: 3,
							row: 0,
							sizeY: 1,
							sizeX: 4,
							name: 'Все события',
							type: 'actions'
						},
						{
							col: 3,
							row: 3,
							sizeY: 1,
							sizeX: 1,
							name: 'Добавить виджет',
							type: 'addVidget'
						}
					
					];
				} else { //--------инче инициализируем с $localStorage
					dash.dashboards = $localStorage.dashboards;
				}
				return dash;
			};
			
			//-------------реализация метода добавления виджета на панель
			this.addVidget = function(name, type) {
				//---------необходимо сделать обработчик для проверок допустимости данных
				
				var newVidget = {
					col: 0,
					row: 0,
					sizeY: 2,
					sizeX: 2,
					name: name,
					//---выше необходимо для настройки отображения в grsdster
					type: type // необходимо для выбора нужного темплейта
				};
			//	alert(newVidget.name + ' dfvgsd' +newVidget.type);
				dash.dashboards.push(newVidget);
				$localStorage.dashboards = dash.dashboards;
				
			};
			//-------------реализация метода удаления виджета с панели
			this.delVidget = function(vidget) {
				var index = dash.dashboards.indexOf(vidget);
				//vm.albums[index].hide = 'hide';  
				dash.dashboards.splice (index, 1);
				$localStorage.dashboards = dash.dashboards;
				
			};
			
		}
	
})();