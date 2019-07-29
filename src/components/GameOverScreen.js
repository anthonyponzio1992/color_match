import './GameOverScreen.css';
import React from 'react';

export default function GameOverScreen({ gameOver }) {
  return gameOver ? (
    <div className="game-over-screen">
      <div className="box-border win-msg">You Win!</div>
    </div>
  ) : null;
};
