'use strict';

(function(isNodejs, isAngular){	
	
			
		// сделать не ноде а аттриб, избалюсь от этого бреда
		function node(node, parentId) {
			//--------
			if (typeof node !== 'undefined') {
				this.attrib =   (typeof node.attrib !== 'undefined') ?  node.attrib : {};
				this.subitem =  (typeof node.subitem !== 'undefined') ?  node.subitem : [];
			} else {
				this.attrib = {};
				this.subitem = [];
			}
			this.parentId =  (typeof parentId !== 'undefined') ? parentId : null;
			
		};
		
		node.prototype.addSubitem = function(node_name){
			var newSubItem = {};
			newSubItem.attrib = {};
			newSubItem.attrib.name = node_name;
			this.subitem.push(newSubItem);
		};
		node.prototype.getId = function() {
			return this.attrib.id;
		};
		node.prototype.setAttrib = function(attrib) {
			this.attrib = attrib;
		}

	
	//nodesItems().prototype.
	//--------определение модуля на экспорт Angular, NodeJS
	if (isAngular) {
		// AngularJS module definition
		//angular.module('netmonApp')
		//	.service('nodesList', nodesList);
	} else 
	if (isNodejs) {
		// NodeJS module definition
		module.exports.node = node;
	}

})(typeof module !== 'undefined' && module.exports, typeof angular !== 'undefined');