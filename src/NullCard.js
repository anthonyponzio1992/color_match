class NullCard {
  constructor() {
    this.flipped = true;
    this.color = '#232123';
  }
  flip = () => {};
  isMatch = () => {};
}

const singleton = new NullCard();

export default singleton;