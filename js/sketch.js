// Modes:-
// Player vs Player:   1
// Player vs computer: 2
// Multiplayer:        3
var data;
var cells = [];
var noOfturns = 0;
var reset;
var clearAll;
var output;
var playerStatus;
var gameOver;
var gameMode;
var scoreOfA = 0;
var scoreOfB = 0;
var scoreOf1;
var scoreOf2;
var submit;
var menu;

function resetCanvas() {
	noOfturns = 0;
	cells.splice(0, 9);
	createGrid(3, 3);

	playerStatus.html("Turn of player " + 1);
	output.html("");

	gameOver = false;
	gameMode = 2;
	// changeMode();
	updateCanvas();
}

function clearCanvas() {
	resetCanvas();
	scoreOfA = 0;
	scoreOfB = 0;
}

function changeMode() {
	if(menu.value() === "Single Player") {
		clearCanvas();
		gameMode = 2;
	} else if(menu.value() === "Multiplayer") {
		clearCanvas();
		gameMode = 1;
	}
}

function preload() {
	data = loadJSON("../data/data.json");
}

function setup() {
	createCanvas(300, 300).parent("canvas");
	reset = select('#reset').mousePressed(resetCanvas);
	clearAll = select('#clearAll').mousePressed(clearCanvas);
	submit = select('#submit').mousePressed(changeMode);
	menu = select('#menu');
	output = select('#output');
	scoreOf1 = select('#scoreOfA');
	scoreOf2 = select('#scoreOfB');
	playerStatus = select('#playerStatus');	
	// console.log(data);
	resetCanvas();
}

function mousePressed() {
	var players = noOfturns % 2;
	clicked = false;

	if(!gameOver) {
		for(var i = 0; i < cells.length; i++) {
			if(cells[i].clicked(mouseX, mouseY)) {
				clicked = true;
				cells[i].markedBy = players;
			}
		}
	}
	
	if(clicked) {
		if(players == 0) {
			playerStatus.html("Turn of player " + 2);
		} else {
			switch(gameMode) {
				case 1:
					playerStatus.html("Turn of player " + 1);
					break;

				case 2:
					playerStatus.html("Turn of computer");
					break;

				case 3:
					playerStatus.html("Turn of Player " + 2);
					break;

				default:
					console.log("It worked");
			}
		}
		
		noOfturns++;
		updateCanvas()
		// console.log("Turn of player "+ (player));
	}
}

function updateCanvas() {
	background(255);
	
	if(cells.length > 0) {
		checkStatus();
	}

	if(gameMode == 2 && noOfturns > 0 && gameOver === false) {
		turnof(1);
		checkStatus();
	}

	for(var i = 0; i < cells.length; i++) {
		cells[i].display();
	}
}


function createGrid(row, col) {
	var rows = row;
	var cols = col;
	var size = (width - 10) / rows;

	for(var i = 0; i < rows; i++) {
		for(var j = 0; j < cols; j++){

			var y = i*size;
			var x = j*size;
			cells.push(new Cell(x, y, size));


			// fill(255);
			// rect(x, y, size, size);
		}
	}
}

function checkStatus() {
	if(isWinner(0)){
		output.html("Player 1 wins");
		scoreOfA++;
		gameOver = true;
	} else if(isWinner(1)) {
		output.html("Player 2 wins");
		scoreOfB++;
		gameOver = true;
	}

	if(checkDraw() && noOfturns == 9) {
		output.html("Draw");
		scoreOfA++;
		scoreOfB++;
		gameOver = true;
	}

	scoreOf1.html(scoreOfA);
	scoreOf2.html(scoreOfB);
}

function turnof(mode) {
	switch(mode) {
		case 1:
			play();
			noOfturns++;
			break;

		default:

	}
}


