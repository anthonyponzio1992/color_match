export default class Card {
  constructor(color, pos) {
    this.flipped = false;
    this.color = color;
    this.pos = pos;
  }

  isMatch = card => this.color === card.color; 

  flip = () => {
    this.flipped = !this.flipped;
    return true;
  }
}