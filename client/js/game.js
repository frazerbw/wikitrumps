/**
 * ...
 * @author Frazer Bennett Wilford
 */

var canvas; // Canvas reference
var ctx; // Canvas context reference

// Contains all the objects to be rendered to the canvas screen
var list = new RenderList();

var player1;
var player2;

// Mouse coordinates
var mousePosX;
var mousePosY;

// Runs when the page has finished loading
if (document.getElementById) { window.onload=init; }

function init() {
	// Setups the canvas and canvas events
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	canvas.addEventListener('mousemove', getMousePos, false);
	canvas.addEventListener("click", onClick, false);

	// Creates the game objects
	setup();

	// Begins the gameloop
	setInterval(function() {update()}, 15);
}

function setup() {
	list.add(new Background());

	player1 = new Player("Frazer", new Deck(50, canvas.height - 100));
	player2 = new Player("AI", new Deck(canvas.width - 100, canvas.height - 100));

	card1 = new Card(player1, "Fox", "http://media.mnn.com/assets/images/2015/09/01-zen-fox.jpg", 150, 30);
	list.add(card1);

	card2 = new Card(player2, "Doge", "https://pbs.twimg.com/profile_images/378800000822867536/3f5a00acf72df93528b6bb7cd0a4fd0c.jpeg", 525, 30);
	list.add(card2);
	card2.toggle();

	player1.getDeck().add(card1);
	player1.getDeck().add(card1);
	player1.getDeck().add(card1);
	player1.getDeck().add(card1);
	player1.getDeck().add(card1);
	player1.getDeck().add(card1);
	list.add(player1.getDeck());

	player2.getDeck().add(card1);
	player2.getDeck().add(card1);
	player2.getDeck().add(card1);
	player2.getDeck().add(card1);
	player2.getDeck().add(card1);
	player2.getDeck().add(card1);
	list.add(player2.getDeck());
}

function update() {
	list.render();
}

// Handles click events
function onClick(e) {
	if (card1.isHover()) {
		card1.toggle();
	}

	if (card2.isHover()) {
		card2.toggle();
	}

	if (player1.getDeck().isHover()) {
		player1.getDeck().draw();
	}
	if (player2.getDeck().isHover()) {
		player2.getDeck().draw();
	}
}

// Gets and then sets the mouse coordinates
function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  mousePosX = evt.clientX - rect.left;
  mousePosY = evt.clientY - rect.top;
}

