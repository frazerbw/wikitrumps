/**
 * ...
 * @author Frazer Bennett Wilford
 */
function FlyOffCard(card, delay, xSpeed, ySpeed) {
	this.card = card;
	this.x = card.getX();
	this.y = card.getY();

	this.delay = delay;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.alpha = 1;
}

FlyOffCard.prototype.update  = function() {
	if (this.delay < 0) {

		if (this.alpha > 0.05) {
			this.alpha -= 0.05;
		} else {
			list.remove(this.card);
			this.alpha = 0.01;
		}

		this.x += this.xSpeed;
		this.y += this.ySpeed;
		this.card.setCords(this.x, this.y);
		this.card.setAlpha(this.alpha);
	} else {
		this.delay -= 1;
	}
}

FlyOffCard.prototype.isFinished  = function() {
	return this.x > canvas.width || this.x < -250 || this.y < -300;
}