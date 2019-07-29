import React, { Component, Fragment } from 'react';
import Card from '../Card';
import NullCard from '../NullCard';
import Board from './Board';
import NewGameBtn from './NewGameBtn';
import arrayShuffle from '../util/arrayShuffle';
import colorSet from '../util/colorSet';

export default class Game extends Component {
  constructor(props) {
    super(props);
    const colors = colorSet.concat(colorSet);
    this.state = {
      cards: arrayShuffle(colors).map((color, pos) => new Card(color, pos)),
      previousCard: null,
      inTimeout: false,
    }
  }

  flip = card => card.flip() && this.setState(prevState => prevState);

  setPreviousCard = previousCard => this.setState({ previousCard });

  move = async card => {
    if (this.invalidMove(card)) return; 
    const { previousCard } = this.state;
    await this.flip(card);
    if (previousCard) await this.match(previousCard, card);
    await this.setPreviousCard(previousCard ? null : card);
  };

  invalidMove = card => (
    this.state.inTimeout ||
    Object.is(this.state.previousCard, card) ||
    Object.is(card, NullCard)
  );

  match = (card1, card2) => {
    this.inTimeout(500, () => {
      if (card1.isMatch(card2)) {
        this.nullCardsOnMatch(card1, card2);
      } else {
        this.flip(card1);
        this.flip(card2);
      }
    });
  };

  nullCardsOnMatch = (card1, card2) => {
    this.setState(prevState => {
      prevState.cards[card1.pos] = NullCard;
      prevState.cards[card2.pos] = NullCard;
      return prevState;
    });
  };

  inTimeout = async (milliseconds, callback) => {
    await this.setState({ inTimeout: true });
    await setTimeout(async () => {
     await this.setState({ inTimeout: false });
     callback && await callback();
    }, milliseconds);
  };

  isGameOver = () => this.state.cards.every(card => Object.is(card, NullCard));

  render() {
    const gameOver = this.isGameOver();
    return  (
      <Fragment>
        <Board cards={this.state.cards} move={this.move} gameOver={gameOver} />
        <NewGameBtn {...{ gameOver, newGame: this.props.newGame }} />
      </Fragment>
    );
  }
}