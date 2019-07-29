import './Tile.css';
import React, { Component } from 'react';

export default class Tile extends Component {
  move = () => this.props.move(this.props.card);

  render() {
    const { card: { flipped, color }} = this.props;
    const backgroundColor = flipped ? color : 'lightgrey';
    return (
      <button
        className="tile box-border"
        onClick={this.move}
        style={{ backgroundColor }}
      >
      </button>
    );
  }
}