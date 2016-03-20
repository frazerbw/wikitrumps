/**
 * ...
 * @author Frazer Bennett Wilford
 */
function Card(owner, articleName, url, statVals, x, y) {
	this.owner = owner;
	this.articleName = articleName;
	this.startX = x;
	this.startY = y;
	this.x = x;
	this.y = y;

	this.hidden = false;
	this.alpha = 1;

	this.cardWidth = 350;
	this.cardHeight = 500;

	this.url = url;
	this.cardImage = new Image();
	this.cardImage.src = url;

	this.cardBase = new Image();
	this.cardBase.src = "imgs/Wiki_background.jpg";

	this.statTitles = ["Number of Links", "Number of Images", "Number of References", "Id Value"];
	this.statVals = statVals;

	this.hoverTolerance = 5;
	this.lock = false;

	this.highlightedStat = -1;

	var thisClass = this;

	// $.ajax("https://frozen-wave-21193.herokuapp.com/data", {
 //            success: function(data) {
 //                thisClass.statVals[1] = data.imageCount;
 //                thisClass.statVals[0] = data.linkCount;
 //                thisClass.statVals[2] = data.refCount;
 //                thisClass.statVals[3] = data.id;
 //                thisClass.cardImage.src = data.imageURL;
 //            },
 //            data: {
 //                page_title: thisClass.articleName //" 'doge' as the default value to stop this breaking"
 //            }
 //    });
    $.ajax("/data", {
            success: function(data) {
                thisClass.statVals[1] = data.imageCount;
                thisClass.statVals[0] = data.linkCount;
                thisClass.statVals[2] = data.refCount;
                thisClass.statVals[3] = data.id;
                thisClass.cardImage.src = data.imageURL;
            },
            data: {
                page_title: thisClass.articleName //" 'doge' as the default value to stop this breaking"
            }
    });
}

Card.prototype.toggle  = function() {
	this.hidden = !this.hidden;
}

Card.prototype.update  = function(x) {
}

Card.prototype.render = function() {
	ctx.globalAlpha = this.alpha;

	this.generateCardBase();
	if (!this.hidden) {
	    this.generateCardTitle();
	    this.generateCardImage();
	  	this.generateCardStats();
  	} else {
  		this.generateOwnerName();
  	}

  	ctx.globalAlpha = 1;
};

Card.prototype.generateCardBase  = function() {
    if (this.isHover()) {
    	ctx.fillStyle = '#DDD';
    } else {
		ctx.fillStyle = '#EEE';
    }

    ctx.drawImage(this.cardBase, this.x + 0.5, this.y + 0.5, this.cardWidth, this.cardHeight);
    ctx.beginPath();
    ctx.rect(this.x + 0.5, this.y + 0.5, this.cardWidth, this.cardHeight);
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

	for (var i = 0; i < this.statTitles.length; i++) {
		this.generateCardStatText(i, this.statTitles[i], this.statVals[i], xPos, yPos + 25 * i);
	}
}

Card.prototype.isHoverCardStat  = function(id, yPos) {
	return this.isHover() && mousePosY > yPos - 10 && mousePosY < yPos + 15;
}

Card.prototype.generateCardStatText  = function(id, title, val, x, y) {
	ctx.font = "18px Arial";
	ctx.textAlign = "left";

	if (this.lock) {
		if (id == this.highlightedStat) {
			ctx.fillStyle = '#900';
		} else {
			ctx.fillStyle = '#666';
		}
	} else if (this.isHoverCardStat(id, y)) {
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

Card.prototype.getSelectedStatId = function() {
	yPos = this.y + 0.5 + Math.round(this.cardHeight/2) + 150;

	for (var i = 0; i < this.statTitles.length; i++) {
		if (this.isHoverCardStat(i, yPos +  25 * i)) {
			return i;
		}
	}

	return -1;
}

Card.prototype.getStatVal = function(id) {
	return this.statVals[id];
}

Card.prototype.isHidden = function() {
	return this.hidden;
};

Card.prototype.isHover = function() {
	return (mousePosX > this.x - this.hoverTolerance && mousePosX < this.x + this.cardWidth + this.hoverTolerance &&
			mousePosY > this.y - this.hoverTolerance && mousePosY < this.y + this.cardHeight + this.hoverTolerance);
};

Card.prototype.getX = function() {
	return this.x;
};

Card.prototype.getY = function() {
	return this.y;
};

Card.prototype.setAlpha= function(alpha) {
	this.alpha = alpha;
};

Card.prototype.setCords = function(x,y) {
	this.x = x;
	this.y = y;
};

Card.prototype.lockCard = function() {
	this.lock = true;
}

Card.prototype.highlightStat = function(id) {
	this.highlightedStat = id;
}

Card.prototype.copy = function(owner) {
	return new Card(owner, this.articleName, this.url, this.statVals, this.startX, this.startY);
}