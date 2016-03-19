/**
 * ...
 * @author Frazer Bennett Wilford
 */
function Player(playerName, deck) {
	this.playerName = playerName;
	this.deck = deck;
	this.deck.setPlayer(this);
}

Player.prototype.getDeck  = function() {
	return this.deck;
}

Player.prototype.getName  = function() {
	return this.playerName;
}

