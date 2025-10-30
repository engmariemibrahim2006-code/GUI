class Map {
  constructor(selector) {
    this.mapElement = $(selector);
    this.canvas = this.mapElement[0];
    this.ctx = this.canvas.getContext("2d");
    this.cellSize = 30; 
    this.gridSize = 15;
    this.canvas.width = this.cellSize * this.gridSize;
    this.canvas.height = this.cellSize * this.gridSize;

    this.drawGrid();
  }

  clear() {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }


    drawGrid() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      for (let i = 0; i <= this.gridSize; i++) {
        this.ctx.moveTo(i * this.cellSize, 0 );
        this.ctx.lineTo(i * this.cellSize, this.canvas.height );
        this.ctx.moveTo(0, i * this.cellSize);
        this.ctx.lineTo(this.canvas.width, i * this.cellSize );
      }
      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
      this.ctx.closePath();
    }

     drawRover(x, y, color = 'red') {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }

     drawPath() {
      this.ctx.fillStyle = 'blue';
      const pathPoints = [
        {x: 1, y: 2},
        {x: 2, y: 3},
        {x: 3, y: 4}
      ];
      pathPoints.forEach(p => {
        this.ctx.fillRect(p.x * this.cellSize, p.y * this.cellSize, this.cellSize, this.cellSize);
      });
    }

     drawMine() {
      this.ctx.fillStyle = 'black';
      this.ctx.beginPath();
      this.ctx.arc(6 * this.cellSize + this.cellSize / 2, 7 * this.cellSize + this.cellSize / 2, this.cellSize / 3, 0, 2 *Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
    }

     updateMap(selected)
     {
      this.clear();
      this.drawGrid();
      if (selected.switchPath) this.drawPath();
      if (selected.switchMine) this.drawMine();
      if (selected.switchRover) this.drawRover(0 , 0);
}

  }