/**
 * ...
 * @author Frazer Bennett Wilford
 */
function DrawCard(card, startX, startY, targetX, targetY) {
	this.card = card;
	this.x = startX;
	this.y = startY;
	this.targetX = targetX;
	this.targetY = targetY;

	this.alpha = 0.00;
	this.delay = 120;
}

DrawCard.prototype.update  = function() {
	if (this.delay == 0) {
		if (this.x < this.targetX) {
			this.x += 10;
		} else if (this.x > this.targetX) {
			this.x -= 10;
		}

		if (this.y < this.targetY) {
			this.y += 10;
		} else if (this.y > this.targetY) {
			this.y -= 10;
		}

		if (this.alpha < 1) {
			this.alpha += 0.05;
		}
	} else {
		this.delay -= 1;
	}

	this.card.setCords(this.x, this.y);
	this.card.setAlpha(this.alpha);
}

DrawCard.prototype.isFinished  = function() {
	return (this.x == this.targetX && this.y == this.targetY);
}