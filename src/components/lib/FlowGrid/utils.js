export function keycodeToDirection (keyCode) {
  // up arrow
  if (keyCode == '38') {
    return 'up'
  }
  // down arrow
  else if (keyCode == '40') {
    return 'down'
  }
  // tab
  else if (keyCode == '9') {
    return 'right'
  }
  // left arrow
  else if (keyCode == '37') {
    return 'left'
  }
  // right arrow
  else if (keyCode == '39') {
    return 'right'
  };
}

export class DirectionToLocation {
  constructor(size, location) {
    this.size = Object.assign(size);
    this.location = Object.assign({}, location);
  }
  down() {
    this.location.row = Math.min((this.location.row + 1), (this.size.rows - 1))
    return this.location
  }
  up() {
    this.location.row = Math.max((this.location.row - 1), 0)
    return this.location
  }
  left() {
    this.location.column = Math.max((this.location.column - 1), 0)
    return this.location
  }
  right() {
    this.location.column = Math.min((this.location.column + 1), (this.size.columns - 1))
    return this.location
  }
}
