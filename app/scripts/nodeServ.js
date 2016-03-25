var serverAJAX = "http://localhost:3000/api/";

//-------сервис обслуживающий список узлов системы на клиентской стороне
angular.module('netmonApp')
	.service('nodeServ', nodeServ);
	
	function nodeServ($http) {
		//----------получение данных с сервера по AJAX -----------
		this.getNodes = function() {
			return $http.get(serverAJAX + 'nodes')
				.then(function (data) {
					
					var res =	transform(data.data.node)
					return res;
					//return data.data.node;
				}, function(err) {
					console.log("что то не так");
				});
		}
	};
	
	
	
	function transform(rawc) {
		
			var res = {};
			var result = {};
			var i;
			//строим хеш наверное делать на єтапе парсинга ][ml н сервере
			for (i in rawc) {
				var key = 'Node.'+rawc[i].attrib.id;
				res[key] = rawc[i]; 
				//res[key].parentId = "menu";
			}
			
			for (i in res) {
				res[i].parentId =  res[i].parentId ? res[i].parentId : '';
				if (res[i].attrib.type === 'Group') {
					var k;
					res[i].nodes = {};
					for (k in res[i].subitem) {
						var key = res[i].subitem[k].attrib.name;
						res[i].nodes[key] = res[key];
							
						res[key].dele = true;
							res[key].parentId = res[i].parentId + "." + res[i].attrib.id; //------------деллаем ссылку на родительский эллемент
						//console.log(key);
					}
				}
			}
			for (i in res) {
				if (!res[i].dele) {
					result[i] = res[i];
				}
			}
			//console.log(res);
			return result;
		}; 
		


