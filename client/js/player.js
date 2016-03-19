/**
 * ...
 * @author Frazer Bennett Wilford
 */
function Player(playerName, deck) {
	this.playerName = playerName;
	this.deck = deck;
}

Player.prototype.getDeck  = function() {
	return this.deck;
}

Player.prototype.getName  = function() {
	return this.playerName;
}

