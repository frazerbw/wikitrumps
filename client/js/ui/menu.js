/**
 * ...
 * @author Frazer Bennett Wilford
 */

function Menu() {
	this.delayMax = 500;
	this.delay = 0;
}

Menu.prototype.render = function() {
	if (this.delay == this.delayMax) {
		ctx.font = "48px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = '#000';
		ctx.fillText("Choose Mode", canvas.width/2, 200);

		ctx.font = "24px Arial";
		ctx.textAlign = "center";

		if (this.isHover()) {
			ctx.fillStyle = '#D00';
		} else {
			ctx.fillStyle = '#000';
		}

		ctx.fillText("vs Human", canvas.width/2, 250);
	} else {
		ctx.font = "24px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = '#000';
		ctx.fillText("Loading Cards " + Math.round((this.delay/this.delayMax) * 100)+ "%", canvas.width/2, 225);
		this.delay += 1;
	}
};

Menu.prototype.update = function() {
	
};

Menu.prototype.isHover = function() {
	return (mousePosX > 300 && mousePosX < canvas.width - 400 &&
			mousePosY > 210  && mousePosY < 260);
};