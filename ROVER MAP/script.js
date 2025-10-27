// TEST DATA
 
 let x = 4;
let y = 5;
let angle = 0;

function updateDataDisplay() {
  document.getElementById('x-value').textContent = x;
  document.getElementById('y-value').textContent = y;
  document.getElementById('angle-value').textContent = angle.toFixed(1);
}

// simulation
setInterval(() => {
  x = (x + 1) % 10;
  y = (y + 1) % 10;
  angle = (angle + 15) % 360;
  updateDataDisplay();
  updateMap();
}, 1000);
    updateDataDisplay();