import './NewGameBtn.css';
import React from 'react';

export default function NewGameBtn({ newGame, gameOver }) {
  return (
    <button className="new-game box-border" onClick={newGame}>
      {gameOver ? 'Play Again' : 'New Game'}
    </button>
  );
}