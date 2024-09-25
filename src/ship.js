class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.tiles = [];
  }

  hit() {
    this.hits += 1;
    this.sunk = this.hits >= this.length;
  }
}

export default Ship;
