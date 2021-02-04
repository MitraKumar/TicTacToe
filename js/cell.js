class Cell {
	constructor(x, y, w, i, j) {
		this.pos = createVector(x, y);
		this.w = w;
		this.markedBy = null;
		this.col = random(255) - 155;
		this.i = i;
		this.j = j;
	}

	display() {
		fill(244, 244, 244);

		if (this.i > 0) {
			// Top line
			line(this.pos.x, this.pos.y, this.pos.x + this.w, this.pos.y)
		}
		if (this.j < 2) {
			// Right line
			line(this.pos.x + this.w, this.pos.y, this.pos.x + this.w, this.pos.y + this.w)
		}
		if (this.i < 2) {
			// Bottom line
			line(this.pos.x, this.pos.y + this.w, this.pos.x + this.w, this.pos.y + this.w)
		}
		if (this.j > 0) {
			// Left line
			line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.w)
		}
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
