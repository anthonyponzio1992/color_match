import './GameWrapper.css';
import React, { Component} from 'react';
import Game from './Game';

export default class GameWrapper extends Component {
  state = { gameNum: 0 };

  newGame = () => this.setState((prevState) => ({
    gameNum: prevState.gameNum + 1,
  }));

  render() {
    return (
      <div className="game-wrapper">
        <Game key={this.state.gameNum} newGame={this.newGame} />
      </div>
    );
  }
}