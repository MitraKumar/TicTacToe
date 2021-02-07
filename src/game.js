export function checkWinner(squares, player) {
  const data = {
    pattern: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
  };

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 3; j++) {
      var index = data.pattern[i][j];
      if (squares[index] != player) break;
    }
    if (j === 3) return true;
  }
  return false;
}

export function isDraw(squares) {
  for (let cell of squares) {
    if (cell === null) {
      return false;
    }
  }
  return true;
}

export function get_move_index(squares) {
	return move_with_minmax(squares);
}


function move_with_minmax(squares) {

	const human = "X";
	const ai = "O";
	let cells = squares;

	function findBestMove() {
		var bestVal = -Infinity;
		var index = -1;
		for(var i = 0; i < 9; i++) {
			if(cells[i] === null) {
				cells[i] = ai;

				var moveVal = minMax(false);
				if(moveVal > bestVal) {
					index = i;
					bestVal = moveVal;
				}
				cells[i] = null;
			}
		}
		return index;
	}

	function minMax(isMax) {
		let score = evaluate();
		if(score == 10 || score == -10 || score == 0) return score;

		if(isMax) {
			let best = -Infinity;
			for(var i = 0; i < 9; i++) {
				if(cells[i] === null) {
					cells[i] = ai;
					var currentbest = minMax(false);
					if(currentbest > best) {
						best = currentbest;
					}
					cells[i] = null;
				}
			}
			return best;
		}

		let best = Infinity;
		for(var i = 0; i < 9; i++) {
			if(cells[i] === null) {

				cells[i] = human;
				var currentbest = minMax(true);
				if(currentbest < best) {
					best = currentbest;
				}
				cells[i] = null;
			}
		}
		return best;
	}

	function evaluate() {
		if(checkWinner(cells, human)) return -10;
		if(checkWinner(cells, ai)) return 10;
		if(isDraw(cells)) return 0;
	}

	return findBestMove()

}

/*
	@TODO: Will use this random move in the easy mode,
 */
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
