/**
 * ...
 * @author Frazer Bennett Wilford
 */
function ShakeCard(card, shakes) {
	this.card = card;
	this.x = card.getX();
	this.y = card.getY();

	this.shakeRight = true;
	this.shakeCurrent = 0;
	this.shakeMax = 10;
	this.shakeNum = 0;
	this.shakeNumMax = shakes;
}

ShakeCard.prototype.update  = function() {
	if (this.shakeNum < this.shakeNumMax) {
		if (this.shakeRight) {
			this.x += 2;
			this.shakeCurrent += 2;

			if (this.shakeCurrent >= this.shakeMax) {
				this.shakeNum += 1;
				this.shakeRight = false;
			}
		} else {
			this.x -= 2;
			this.shakeCurrent -= 2;

			if (this.shakeCurrent <= - this.shakeMax) {
				this.shakeNum += 1;
				this.shakeRight = true;
			}
		}
		this.card.setCords(this.x, this.y);
	}
}

ShakeCard.prototype.isFinished  = function() {
	return this.shakeNum == this.shakeNumMax;
}