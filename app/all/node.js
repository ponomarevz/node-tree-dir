
'use strict';
(function(){
	
	
	function CreateNodesList() {
		this resultNodesHash; //------храним исходный со ссылками просто искать по ID------
		this resultNodesTree; // --------кеширована версия нодов для теста-----------------
	
		//--------------- метод принимает нод(обект) и встаривает его внужное место дерева ----------------
		//--------------- сначала обновляет хеш, потом по обновленному хешу перестраивает дерево ----------
		//--------------- возвращает результирующие дерево, для формирование модели------------------------
		this.updateNode = function(node) {
			//	console.log(JSON.stringify(resultNodesHash));
			var node_name = 'NODE.' + node.attrib.id;
			node.parentId = []; //---------- парент ID пока так
			resultNodesHash[node_name] = node;
			return transform(resultNodesHash);
		};
		//--------------- метод принимает иимя нода и удаляет его из хеша---------- -----------------------
		//--------------- сначала обновляет хеш, потом по обновленному хешу перестраивает дерево ----------
		//--------------- возвращает результирующие дерево, для формирование модели------------------------
		this.removeNode = function(node_name) {
			//	console.log(JSON.stringify(resultNodesHash));
			delete resultNodesHash[node_name];
			return transform(resultNodesHash);
		};
	
		//------ функции формирующие ХЕШ нодов и трансформирующие дерево ----- 
		// 1. сделать корневой фолдер (должен быть, при добавлениие это важно)
		// 2. метод добавить удалить узел переместить узел 
		
		function buildHash(rawc){
			var res = {};
				var i;
				//строим хеш наверное делать на єтапе парсинга ][ml н сервере
				for (i in rawc) {
					var key = 'NODE.'+rawc[i].attrib.id;
					res[key] = rawc[i]; 
					res[key].parentId = [];
				}
				return res;
		};
		
		function transform(res) {
			
			var result = {};
			var i;
							
			for (i in res) {
				
				if (res[i].attrib.type === 'GROUP') {
					var k;
					res[i].nodes = {};
					var t0 = performance.now();
					for (k in res[i].subitem) {
						var key = res[i].subitem[k].attrib.name; //Node.N
						
						if (res[key]) {
							var obj = res[key];
							res[i].nodes[key] = obj;
								
							obj.isSubitem = true;
							obj.parentId.push(res[i].attrib.id);// = res[i].parentId.concat(res[i].attrib.id); //------------деллаем ссылку на родительский эллемент
						} else {
							delete res[i].subitem[k];
							// наверное удалить subitem
						}
							
					  //console.log(key);
					}
					var t1 = performance.now();
					console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to generate:', result);
				}
				
			}
			for (i in res) {
				if (!res[i].isSubitem) { 
					result[i] = res[i];
				}
				
			}
			//console.log(res);
			return  result;
				
		}
	
	}
	
	
})()