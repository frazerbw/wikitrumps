/**
 * ...
 * @author Frazer Bennett Wilford
 */

var canvas; // Canvas reference
var ctx; // Canvas context reference

// Contains all the objects to be rendered to the canvas screen
var list = new RenderList();

var aniEvent = [];

var activeCard1;
var activeCard2;

var currentPlayer;
var player1;
var player2;

// Mouse coordinates
var mousePosX;
var mousePosY;

var flyOffDelay = 60;
var flyOffSpeed = 10;

var menu;
var isMenuActive;

// For preloading
var card11;
var card12;
var card21;
var card22;

var articles = ["Dream", "Beer", "Fox", "Knight", "Yoshi", "Pikachu", "School", "Duck", "Bean",
				"Camel", "Doge", "Batman", "Chemistry", "Chicken", "Warrior", "Energy", "Cake", "Oasis",
				"Apple", "Sun", "Moon", "Rifle", "Sword", "Shield", "Car", "Dragon", 
				"Demon", "Angel", "God", "Cod", "Cave",
				"Philosophy", "Water", "Ice", "Love", "Superman", "Britney Spears"]

// Runs when the page has finished loading
if (document.getElementById) { window.onload=init; }

function init() {
	// Setups the canvas and canvas events
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	canvas.addEventListener('mousemove', getMousePos, false);
	canvas.addEventListener("click", onClick, false);

	// Creates the game objects
	setupMenu();

	// Begins the gameloop
	setInterval(function() {update()}, 15);
}

function setupMenu() {
	isMenuActive = true;
	menu = new Menu();
	list.add(new Background());
	list.add(menu);

	// FOR PRELOADING
	player1 = new Player("Frazer", new Deck(50, canvas.height - 100));
	player2 = new Player("Darren", new Deck(canvas.width - 100, canvas.height - 100));

	currentPlayer = player1;

	card11 = new Card(player1, getArticleName() , "", [0,0,0], 150, 30);
	card12 = new Card(player1, getArticleName() , "", [0,0,0], 525, 30);
	card21 = new Card(player2, getArticleName() , "", [0,0,0], 150, 30);
	card22 = new Card(player2, getArticleName() , "", [0,0,0], 525, 30);
	card22.toggle();

	player1.getDeck().add(card11);
	player1.getDeck().add(card12);
	player1.getDeck().add(new Card(player1, getArticleName() , "", [0,0,0,0], 525, 30));
	player1.getDeck().add(new Card(player1, getArticleName() , "", [0,0,0,0], 525, 30));
	player1.getDeck().add(new Card(player1, getArticleName() , "", [0,0,0,0], 525, 30));
	player1.getDeck().add(new Card(player1, getArticleName() , "", [0,0,0,0], 525, 30));
	player1.getDeck().add(new Card(player1, getArticleName() , "", [0,0,0,0], 525, 30));
	player1.getDeck().add(new Card(player1, getArticleName() , "", [0,0,0,0], 525, 30));

	player2.getDeck().add(card22);
	player2.getDeck().add(card21);
	player2.getDeck().add(new Card(player2, getArticleName() , "", [0,0,0,0], 525, 30));
	player2.getDeck().add(new Card(player2, getArticleName() , "", [0,0,0,0], 525, 30));
	player2.getDeck().add(new Card(player2, getArticleName() , "", [0,0,0,0], 525, 30));
	player2.getDeck().add(new Card(player2, getArticleName() , "", [0,0,0,0], 525, 30));
	player2.getDeck().add(new Card(player2, getArticleName() , "", [0,0,0,0], 525, 30));
	player2.getDeck().add(new Card(player2, getArticleName() , "", [0,0,0,0], 525, 30));

	activeCard1 = card11;
	activeCard2 = card22;

	player1.getDeck().log();
	player2.getDeck().log();
}

function getArticleName() {
	id = Math.floor(articles.length * Math.random());
	article = articles[id];
	articles.splice(id, 1);

	return article;
}

function destroyMenu() {
	list = new RenderList();
	isMenuActive = false;
}

function setup() {
	list.add(new Background());
	list.add(card22);
	list.add(card11);
	list.add(player1.getDeck());
	list.add(player2.getDeck());
	activeCard1 = card11;
	activeCard2 = card22;
}

function update() {
	if (!isMenuActive) {
		if (player1.getDeck().isEmpty() || player2.getDeck().isEmpty()) {
			list.remove(activeCard1);
			list.remove(activeCard2);
			aniEvent = [];
		} else {
			// Updates animation events
			for (var i = 0; i < aniEvent.length; i++) {
				aniEvent[i].update();
				if (aniEvent[i].isFinished()) {
					aniEvent.splice(i, 1);
				}
			}
		}
	} 

	list.render();
}

// Handles click events
function onClick(e) {
	if (isMenuActive) {
		if (menu.isHover()) {
			destroyMenu();
			setup();
		}
	} else {
		if (activeCard1.isHover() && currentPlayer == player1) {
			selectedId = activeCard1.getSelectedStatId();
			if (selectedId != -1 && !activeCard1.isHidden()) {
				playStat(selectedId);
			} 
		} else if (activeCard2.isHover() && currentPlayer == player2) {
			selectedId = activeCard2.getSelectedStatId();
			if (selectedId != -1 && !activeCard2.isHidden()) {
				playStat(selectedId);
			} 
		}

		if (player1.getDeck().isHover()) {
			player1.getDeck().draw();
		}
		if (player2.getDeck().isHover()) {
			player2.getDeck().draw();
		}
	}
}

function playStat(id) {
	draw = false;

	if (currentPlayer == player1) {
		activeCard2.toggle();
	} else {
		activeCard1.toggle();
	}

	if (activeCard1.getStatVal(id) > activeCard2.getStatVal(id)) {
		currentPlayer = player1;

		list.add(new TextAlert(player1.getName() + " Wins!"));

		player1.getDeck().add(activeCard1.copy(player1));
		player1.getDeck().add(activeCard2.copy(player1));

		aniEvent.push(new FlyOffCard(activeCard1, flyOffDelay, -flyOffSpeed, 0));
		aniEvent.push(new FlyOffCard(activeCard2, flyOffDelay, -flyOffSpeed, 0));
	} else if (activeCard1.getStatVal(id) == activeCard2.getStatVal(id)) {
		list.add(new TextAlert("Draw!"));

		draw = true;

		player1.getDeck().add(activeCard1.copy(player1));
		player2.getDeck().add(activeCard2.copy(player2));

		aniEvent.push(new FlyOffCard(activeCard1, flyOffDelay, 0, -flyOffSpeed));
		aniEvent.push(new FlyOffCard(activeCard2, flyOffDelay, 0, -flyOffSpeed));
	} else {
		currentPlayer = player2;

		list.add(new TextAlert(player2.getName() + " Wins!"));

		player2.getDeck().add(activeCard1.copy(player2));
		player2.getDeck().add(activeCard2.copy(player2));

		aniEvent.push(new FlyOffCard(activeCard1, flyOffDelay, flyOffSpeed, 0));
		aniEvent.push(new FlyOffCard(activeCard2, flyOffDelay, flyOffSpeed, 0));
	}

	activeCard1.lockCard();
	activeCard2.lockCard();
	activeCard1.highlightStat(id);
	activeCard2.highlightStat(id);

	activeCard1 = player1.getDeck().draw();
	activeCard2 = player2.getDeck().draw();

	if (activeCard1 != null && activeCard2 != null) {
		if (currentPlayer == player1) {
			activeCard2.toggle();
		} else {
			activeCard1.toggle();	
		}
	}

	aniEvent.push(new DrawCard(activeCard1, 
					50,  canvas.height - 100, 
					150, 30));
	aniEvent.push(new DrawCard(activeCard2, 
					canvas.width - 175 - 200,  canvas.height - 100, 
					525, 30));

	list.add(activeCard1);
	list.add(activeCard2);

}

// Gets and then sets the mouse coordinates
function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  mousePosX = evt.clientX - rect.left;
  mousePosY = evt.clientY - rect.top;
}

