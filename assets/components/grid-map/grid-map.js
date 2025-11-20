class GridMap {
  constructor(selector, cellSize, gridSize) {
    this.mapElement = $(selector);
    this.canvas = this.mapElement[0];
    this.ctx = this.canvas.getContext("2d");
    this.cellSize = cellSize;
    this.gridSize = gridSize;
    this.canvas.width = this.cellSize * this.gridSize;
    this.canvas.height = this.cellSize * this.gridSize;
  }

  clear() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawGrid() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    for (let i = 0; i <= this.gridSize; i++) {
      this.ctx.moveTo(i * this.cellSize, 0);
      this.ctx.lineTo(i * this.cellSize, this.canvas.height);
      this.ctx.moveTo(0, i * this.cellSize);
      this.ctx.lineTo(this.canvas.width, i * this.cellSize);
    }
    this.ctx.strokeStyle = "yellow";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.fillStyle = "black";
    this.ctx.font = "30px Arial";
    this.ctx.fillText("1", 10, 50);
  }

  drawLocation(point, color = "red") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      point.x * this.cellSize,
      point.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }

  drawPath(pathPoints, color = "blue") {
    this.ctx.fillStyle = color;
    pathPoints.forEach((p) => {
      this.ctx.fillRect(
        p.x * this.cellSize,
        p.y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    });
  }

  drawMine(point) {
    const gridX = point.x * this.cellSize + this.cellSize / 2;
    const gridY = point.y * this.cellSize + this.cellSize / 2;

    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(gridX, gridY, this.cellSize / 3, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    // Draw mine image if loaded
    let image = document.getElementById("mine-img");
    const imgSize = this.cellSize / 2; // Adjust size as needed
    this.ctx.drawImage(
      image,
      gridX - imgSize / 2, // Center the image
      gridY - imgSize / 2,
      imgSize,
      imgSize
    );
  }
  initMap() {
    this.clear();
    this.drawGrid();
  }
  updateMap(filters, rover) {
    this.initMap();
    if (!filters.pathFilter) this.drawPath(rover.locationHistory);
    if (!filters.roverFilter) this.drawLocation(rover.currentLocation);
    if (!filters.mineFilter)
      rover.minesLocations.forEach((mine) => this.drawMine(mine));
  }
}
class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
class Rover {
  currentLocation = new Point();
  locationHistory = [];
  minesLocations = [];

  move(point) {
    this.locationHistory.push(this.currentLocation);
    this.currentLocation = point;
    if (this.mineDetectedEvent())
      this.minesLocations.push(this.currentLocation);
  }

  mineDetectedEvent() {
    const detected = Math.random() > 0.5;
    return detected;
  }
}

function main() {
  $(document).ready(function () {
    const myMap = new GridMap("#grid-map", 50, 11);
    const rover = new Rover();
    const filters = {
      roverFilter: false,
      mineFilter: false,
      pathFilter: false,
    };

    // Initialize checkboxes state
    Object.keys(filters).forEach((key) => {
      filters[key] = $(`#${key}`).is(":checked");
    });

    myMap.updateMap(filters, rover);

    let iterator = 0;
    const intervalId = setInterval(() => {
      const deltaX = Math.round(Math.random() + 0.3);
      const deltaY = Math.round(Math.random() + 0.3);
      console.log(deltaX, deltaY);
      rover.move({
        x: rover.currentLocation.x + deltaX,
        y: rover.currentLocation.y + deltaY,
      });
      myMap.updateMap(filters, rover);
      if (++iterator === 5) clearInterval(intervalId);
    }, 2000);

    $('input[type="checkbox"]').on("change", function () {
      filters[this.id] = this.checked;
      myMap.updateMap(filters);
    });
  });
}

main();
