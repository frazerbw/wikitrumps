/**
 * ...
 * @author Frazer Bennett Wilford
 */

function RenderList(){ 
	this.list = []; // empty render list
	this.topList = []; // empty top render list
} 

RenderList.prototype.add = function(item) { 
	this.list.push(item); // Adds item to the render list
};

RenderList.prototype.remove = function(item) { 
	for (var i = 0; i < this.list.length; i++) {
		if (this.list[i] == item) {
			this.list.splice(i, 1);
		}
	}
};

RenderList.prototype.render = function() { 
	// Calls the 'render' method on all objects in the render list
	for (i = 0; i < this.list.length; i++) {
		this.list[i].render();
	}

	// Calls the 'render' method on all objects in the top render list
	for (i = 0; i < this.topList.length; i++) {
		this.topList[i].topRender();
	}
};