import React, { useState } from 'react';
import './NumberGuessingGame.css'

function NumberGuessingGame() {
  //tracking the game's status
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [range, setRange] = useState({ min: '', max: '' });
  const [isGameStarted, setIsGameStarted] = useState(false);

  // Function to start/reset the game
  const startGame = () => {
    const min = parseInt(range.min, 10);
    const max = parseInt(range.max, 10);

    if (isNaN(min) || isNaN(max) || min >= max) {
      setFeedback("Please enter a valid range (min < max).");
      return;
    }

    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setTargetNumber(randomNum);
    setAttempts(0);
    setFeedback('');
    setGuess('');
    setIsGameStarted(true);
  };

  // Function to handle guesses
  const handleGuess = () => {
    const guessNumber = parseInt(guess, 10);

    if (isNaN(guessNumber)) {
      setFeedback('Please enter a valid number.');
      return;
    }

    setAttempts(attempts + 1);

    if (guessNumber < targetNumber) {
      setFeedback('Too low! Try again.');
    } else if (guessNumber > targetNumber) {
      setFeedback('Too high! Try again.');
    } else {
      setFeedback(`Congratulations! You guessed it right in ${attempts + 1} attempts.`);
      setIsGameStarted(false);
    }

    setGuess('');
  };

  // Reset the game 
  const resetGame = () => {
    setRange({ min: '', max: '' });
    setTargetNumber(null);
    setAttempts(0);
    setFeedback('');
    setGuess('');
    setIsGameStarted(false);
  };

  return (
    <div className="game-container">
      <h1>Number Guessing Game</h1>
      
      {!isGameStarted && (
        <div>
          <p>Set the range for the game:</p>
          <input
            type="number"
            placeholder="Minimum"
            value={range.min}
            onChange={(e) => setRange({ ...range, min: e.target.value })}
            className="game-input"
          />
          <input
            type="number"
            placeholder="Maximum"
            value={range.max}
            onChange={(e) => setRange({ ...range, max: e.target.value })}
            className="game-input"
          />
          <button onClick={startGame} className="game-button">Start Game</button>
        </div>
      )}
      
      {isGameStarted && (
        <div>
          <p>I've picked a number between {range.min} and {range.max}. Try to guess it!</p>
          <input
            type="number"
            placeholder="Enter your guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="game-input"
          />
          <button onClick={handleGuess} className="game-button">Submit Guess</button>
        </div>
      )}
      
      <p className="feedback">{feedback}</p>
      <p className="attempts-count">Attempts: {attempts}</p>
      <button onClick={resetGame} className="game-button">Reset Game</button>
    </div>
  );
}

export default NumberGuessingGame;
