function checkDraw() {
	return (!isWinner(0) && !isWinner(1));
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
	var bestVal = -10000;
	var index = -1;
	var player = 1;

	for(var i = 0; i < 9; i++) {
		if(cells[i].markedBy === null) {
			cells[i].markedBy = player;

			var moveVal = minMax(false);

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
	var score = evaluate();
	var player = 1;
	var oponent = 0;
	if(score == 10 || score == -10 || score == 0) return score;

	if(isMax) {
		var best = -10000;
		for(var i = 0; i < 9; i++) {
			if(cells[i].markedBy === null) {

				cells[i].markedBy = player;
				var currentbest = minMax(!isMax);
				if(currentbest > best) {
					best = currentbest;
				}
				cells[i].markedBy = null;
			}
		}
		return best;
	}

	var best = 10000;
	for(var i = 0; i < 9; i++) {
		if(cells[i].markedBy === null) {

			cells[i].markedBy = oponent;
			var currentbest = minMax(!isMax);
			if(currentbest < best) {
				best = currentbest;
			}
			cells[i].markedBy = null;
		}
	}
	// console.log(best);
	return best;
}

function evaluate() {
	if(isWinner(0)) return -10;
	if(isWinner(1)) return 10;
	if(noOfturns === 9) return 0;
	return -10000;
}
