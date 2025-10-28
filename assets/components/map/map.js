class map {
  constructor() {
    this.mapElement = $('.map');
  }

  init() {
 
  }

  draw() {
   canvas = this.mapElement[0];
   ctx = canvas.getContext("2d"); 
  }
}