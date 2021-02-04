function checkDraw() {
	for (let cell of cells) {
		if (cell.markedBy === null) {
			return false;
		}
	}
	return true;
}


function isWinner(player) {
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 3; j++) {
			var index = data.pattern[i][j];
			if(cells[index].markedBy != player) break;
		}
		if(j === 3) return true;
	}
	return false;
}

function playRandomly() {
	// choose a random index;
	var selected = false;
	var count = 0;
	while(!gameOver && !selected) {
		var index = floor(random(0, 9));
		// console.log(count, index);
		if(cells[index].markedBy === null) {
			selected = true;
			cells[index].markedBy = 1;
		}
		count++;
		if(count > 2) break;
	}

	if(!gameOver && !selected) {
		for(var i = 0; i < cells.length; i++) {
			if(cells[i].markedBy === null) {
				cells[i].markedBy = 1;
				break;
			}
		}
	}
}


// source: https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
function play() {
	var index = findBestMove();
	// console.log(index);
	cells[index].markedBy = 1;
}

function findBestMove() {
	var bestVal = -Infinity;
	var index = -1;
	/*
		player:
			0 -> human player
			1 -> ai
		*/
	for(var i = 0; i < 9; i++) {
		if(cells[i].markedBy === null) {
			cells[i].markedBy = 1;

			var moveVal = minMax(false);
			console.log(moveVal, i);

			if(moveVal > bestVal) {
				index = i;
				bestVal = moveVal;
				// console.log(bestVal);
			}
			cells[i].markedBy = null;
		}
	}
	return index;
}

function minMax(isMax) {
	let score = evaluate();
	if(score == 10 || score == -10 || score == 0) return score;

	/*
		player:
			0 -> human player (oponent)
			1 -> ai
		*/
	var player = 1;
	var oponent = 0;

	if(isMax) {
		let best = -Infinity;
		for(var i = 0; i < 9; i++) {
			if(cells[i].markedBy === null) {

				cells[i].markedBy = 1;
				var currentbest = minMax(false);
				if(currentbest > best) {
					best = currentbest;
				}
				cells[i].markedBy = null;
			}
		}
		return best;
	}

	let best = Infinity;
	for(var i = 0; i < 9; i++) {
		if(cells[i].markedBy === null) {

			cells[i].markedBy = 0;
			var currentbest = minMax(true);
			if(currentbest < best) {
				best = currentbest;
			}
			cells[i].markedBy = null;
		}
	}
	return best;
}

function evaluate() {
	if(isWinner(0)) return -10;
	if(isWinner(1)) return 10;
	if(checkDraw()) return 0;
}
