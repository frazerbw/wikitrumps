/**
 * ...
 * @author Frazer Bennett Wilford
 */

function Background() {
}

Background.prototype.render = function() {
	ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFF';
    ctx.fill();
};
