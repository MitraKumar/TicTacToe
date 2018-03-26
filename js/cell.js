class Cell {
	constructor(x, y, w) {
		this.pos = createVector(x, y);
		this.w = w;
		this.markedBy = null;
		this.col = random(255) - 155;
	}

	display() {
		fill(244, 244, 244);
		stroke(this.col, this.col, this.col);
		rect(this.pos.x, this.pos.y, this.w, this.w, 20);
		if(this.markedBy == 1) {
			var cx = this.pos.x + this.w / 2;
			var cy = this.pos.y + this.w / 2;
			drawCircle(cx, cy, this.w / 2);
			// fill(0, 0, 155);
		}else if(this.markedBy == 0) {
			// fill(255, 0, 0);
			drawCross(this.pos.x + 20, this.pos.y + 20, this.w - 40);
		}
	}

	clicked(x, y) {
		return (x > this.pos.x && x < this.pos.x + this.w && y > this.pos.y && y < this.pos.y + this.w && this.markedBy === null);
	}
}

function drawCircle(x, y, w) {
	noFill();
	push();
	stroke(255, 0, 0);
	ellipse(x, y, w);
	pop();
}

function drawCross(x, y, w) {
	noFill();
	push();
	stroke(0, 255, 0);
	translate(x, y);
	line(0, 0, w, w);
	line(w, 0, 0, w);
	pop();
}