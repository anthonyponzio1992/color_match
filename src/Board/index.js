import './style.css';
import React, { Component, Fragment } from 'react';
import Tile from '../Tile/';
import arrayShuffle from '../util/arrayShuffle';
import Card from '../Card';
import NullCard from '../NullCard';
import GameOverScreen from '../GameOverScreen/';
import NewGameBtn from '../NewGameBtn/';

const colorSet = [
  '#475577',
  '#9365B8',
  '#2969B0',
  '#F7DA64',
  '#00A885',
  '#A38F84',
  '#E14938',
  '#D1D5D8',
];

export default class Board extends Component {
  constructor(props) {
    super(props);
    const colors = colorSet.concat(colorSet);
    this.state = {
      cards: arrayShuffle(colors).map((color, pos) => new Card(color, pos)),
      previousCard: null,
      inTimeout: false,
    }
  }

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

  flip = card => card.flip() && this.setState(prevState => prevState);

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

  inTimeout = async (milliseconds, callback) => {
    await this.setState({ inTimeout: true });
    await setTimeout(async () => {
     await this.setState({ inTimeout: false });
     callback && await callback();
    }, milliseconds);
  };

  nullCardsOnMatch = (card1, card2) => {
    this.setState(prevState => {
      prevState.cards[card1.pos] = NullCard;
      prevState.cards[card2.pos] = NullCard;
      return prevState;
    });
  };

  isGameOver = () => this.state.cards.every(card => Object.is(card, NullCard));

  render() {
    const { cards } = this.state;
    const game = { gameOver: this.isGameOver(), newGame: this.props.newGame };
    return  (
      <Fragment>
        <GameOverScreen {...game} />
        <div className="board">
          {cards.map((card, i) => (
            <Tile card={card} move={this.move} key={i} />
          ))}
        </div>
        <NewGameBtn {...game} />
      </Fragment>
    );
  }
}