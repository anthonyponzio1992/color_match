import './Board.css';
import React from 'react';
import Tile from './Tile';
import GameOverScreen from './GameOverScreen';

export default function Board({ cards, move, gameOver }) {
  return (
    <div className="board">
      {cards.map((card, i) => (
        <Tile card={card} move={move} key={i} />
      ))}
      <GameOverScreen gameOver={gameOver} />
    </div>
  );
}