/**
 * ...
 * @author Frazer Bennett Wilford
 */
function Card(owner, articleName, url, x, y) {
	this.owner = owner;
	this.articleName = articleName;
	this.x = x;
	this.y = y;

	this.hidden = false;

	this.cardWidth = 350;
	this.cardHeight = 500;

	this.cardImage = new Image();
	this.cardImage.src = url;

	this.stat1Title = "Page Popularity";
	this.stat1Value = 1000;

	this.stat2Title = "Number of Links";
	this.stat2Value = 25;

	this.stat3Title = "Number of Images";
	this.stat3Value = 5;

	this.stat4Title = "Number of Revisions";
	this.stat4Value = 120;

	this.hoverTolerance = 5;
}

Card.prototype.toggle  = function() {
	this.hidden = !this.hidden;
}

Card.prototype.update  = function(x) {
}

Card.prototype.render = function() {
	this.generateCardBase();
	if (!this.hidden) {
	    this.generateCardTitle();
	    this.generateCardImage();
	  	this.generateCardStats();
  	} else {
  		this.generateOwnerName();
  	}
};

Card.prototype.generateCardBase  = function() {
	ctx.beginPath();
    ctx.rect(this.x + 0.5, this.y + 0.5, this.cardWidth, this.cardHeight);

    if (this.isHover()) {
    	ctx.fillStyle = '#DDD';
    } else {
		ctx.fillStyle = '#EEE';
    }

    ctx.fill();
    ctx.stroke();
}

Card.prototype.generateCardTitle  = function() {
	ctx.font = "24px Arial";
	ctx.textAlign = "center";
	ctx.fillStyle = '#000';

	xPos = this.x + 0.5 + Math.round(this.cardWidth/2);
	yPos = this.y + 0.5 + Math.round(this.cardHeight/2) - 200;

	ctx.fillText(this.articleName, xPos, yPos);
}

Card.prototype.generateCardImage  = function() {
	//https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/AfricanWildCat.jpg/1024px-AfricanWildCat.jpg
	ctx.beginPath();
	ctx.rect(this.x + 25.5, this.y + 70.5, 300, 300);
    ctx.fillStyle = '#AAA';
    ctx.fill();
    ctx.stroke();

    ctx.drawImage(this.cardImage, this.x + 25.5, this.y + 70.5, 300, 300);
}

Card.prototype.generateCardStats  = function() {
	xPos = this.x + 0.5 + Math.round(this.cardWidth/2) - 120;
	yPos = this.y + 0.5 + Math.round(this.cardHeight/2) + 150;

	this.generateCardStatText(1, this.stat1Title, this.stat1Value, xPos, yPos);
	this.generateCardStatText(2, this.stat2Title, this.stat2Value, xPos, yPos + 25);
	this.generateCardStatText(3, this.stat3Title, this.stat3Value, xPos, yPos + 50);
	this.generateCardStatText(4, this.stat4Title, this.stat4Value, xPos, yPos + 75);
}

Card.prototype.isHoverCardStat  = function(id, yPos) {
	return this.isHover() && mousePosY > yPos - 10 && mousePosY < yPos + 15;
}

Card.prototype.generateCardStatText  = function(id, title, val, x, y) {
	ctx.font = "18px Arial";
	ctx.textAlign = "left";

	if (this.isHoverCardStat(id, y)) {
		ctx.fillStyle="#000";
		ctx.beginPath();
		ctx.moveTo(x - 20.5, y - 15);
		ctx.lineTo(x - 20.5 + 15, y - 5);
		ctx.lineTo(x - 20.5, y + 5);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = '#000';
	} else {
		ctx.fillStyle = '#666';
	}

	ctx.fillText(title + ": " + val, x, y);
}

Card.prototype.generateOwnerName = function() {
	ctx.font = "48px Arial";
	ctx.textAlign = "center";
	ctx.fillStyle = '#000';
	ctx.fillText(this.owner.getName(), this.x + this.cardWidth/2, this.y + this.cardHeight/2);
}

Card.prototype.isHover = function() {
	return (mousePosX > this.x - this.hoverTolerance && mousePosX < this.x + this.cardWidth + this.hoverTolerance &&
			mousePosY > this.y - this.hoverTolerance && mousePosY < this.y + this.cardHeight + this.hoverTolerance);
};