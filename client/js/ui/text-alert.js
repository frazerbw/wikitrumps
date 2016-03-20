/**
 * ...
 * @author Frazer Bennett Wilford
 */

function TextAlert(message) {
	this.x = canvas.width/2;
	this.y = canvas.height - 50;
	this.message = message;
	this.alpha = 0;
	this.fade = false;
	this.fadeRate = 0.025;
}

TextAlert.prototype.render = function() {
	if (this.alpha < 1 && !this.fade) {
		this.alpha += this.fadeRate;
	} else if (this.fade) {
		this.alpha -= this.fadeRate;
	} else {
		this.fade = true;
	}

	if (this.fade && this.alpha <= 0) {
		list.remove(this);
	} else {
		ctx.globalAlpha = this.alpha;
		ctx.font = "48px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = '#000';
		ctx.fillText(this.message, this.x, this.y);
	}

	ctx.globalAlpha = 1;
};
