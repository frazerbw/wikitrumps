/**
 * ...
 * @author Frazer Bennett Wilford
 */

function Background() {
	this.background = new Image();
	this.background.src = "imgs/squares_texture-wallpaper-2560x1600.jpg";
}

Background.prototype.render = function() {
	ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFF';
    //ctx.drawImage(this.background, 0.5, 0.5, canvas.width, canvas.height);

    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.globalAlpha = 1;
};
