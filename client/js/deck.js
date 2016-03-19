/**
 * ...
 * @author Frazer Bennett Wilford
 */

function Deck(x, y) {
	this.owner = "test";
	this.x = x;
	this.y = y;

	this.cards = [];
	this.cardWidth = 50;
	this.cardHeight = 70;

	this.hoverTolerance = 5;
}

Deck.prototype.draw  = function(card) {
	card = this.cards[1];
	this.cards.shift();
	return card;
}

Deck.prototype.add  = function(card) {
	this.cards.push(card);
}

Deck.prototype.remove  = function(card) {
	for (var i = 0; i < this.cards.length; i++) {
		if (this.cards[i] == card) {
			this.cards.splice(i, 1);
		}
	}
}

Deck.prototype.shuffle = function() {
    var j, x, i;
    for (i = this.deck.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = this.deck[i - 1];
        this.deck[i - 1] = this.deck[j];
        this.deck[j] = x;
    }
}

Deck.prototype.render = function() {

	if (this.isHover()) {
		ctx.fillStyle = '#DDD';
	} else {
		ctx.fillStyle = '#CCC';
	}

	for (var i = 0; i < this.cards.length; i++) {
		ctx.beginPath();
	    ctx.rect(this.x + 0.5 + 2 * i, this.y + 0.5 - 1 * i, this.cardWidth, this.cardHeight);
	    ctx.fill();
	    ctx.stroke();
	}

	if (this.cards.length > 0) {
		ctx.font = "14px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = '#000';
		ctx.fillText(this.owner.getName(), this.x + 0.5 + 2 * this.cards.length + this.cardWidth/2 - 1,
					 this.y - 1 * this.cards.length + this.cardHeight/2 + 4);
	}

	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillStyle = '#000';
	ctx.fillText("card count: " + this.cards.length, this.x + 25, this.y + 90);
}

Deck.prototype.setPlayer  = function(owner) {
	this.owner = owner;
}

Deck.prototype.isHover = function() {
	return (mousePosX > this.x - this.hoverTolerance && mousePosX < this.x + this.cardWidth + this.hoverTolerance + this.cards.length * 2&&
			mousePosY > this.y - this.hoverTolerance && mousePosY < this.y + this.cardHeight + this.hoverTolerance + this.cards.length * 2);
};

Deck.prototype.getX = function() {
	return this.x;
}

Deck.prototype.getY = function() {
	return this.y;
}

Deck.prototype.isEmpty = function() {
	return this.cards.length == 0;
}