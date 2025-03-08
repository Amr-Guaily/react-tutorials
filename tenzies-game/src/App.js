import { nanoid } from 'nanoid';
// import Confetti from 'react-confetti';
import React, { useEffect, useState } from 'react';
import Die from './components/Die';

const App = () => {
  const [dies, setDies] = useState(diesGenerator());
  const [counter, setCounter] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(gameOverHandler, [dies]);

  function generateDie() {
    const die = {
      id: nanoid(),
      value: Math.floor(Math.random() * 7),
      isHeld: false
    };
    return die;
  }
  function diesGenerator() {
    const dies = [];

    for (let i = 0; i < 10; i++) {
      const die = generateDie();
      dies.push(die);
    }
    return dies;
  }

  function heldHandler(id) {
    setDies(() => dies.map(die => die.id == id ? { ...die, isHeld: true } : die));
  }

  function rollHandler() {
    if (gameOver) {
      setGameOver(false);
      setCounter(0);
      setDies(diesGenerator());
    } else {
      const newDies = dies.map(die => !die.isHeld ? generateDie() : die);
      setDies(newDies);
      setCounter((prev) => prev + 1);
    }
  }

  function gameOverHandler() {
    const allIsHeld = dies.every((die) => die.isHeld == true);

    const firstDie = dies[0].value;
    const allTheSame = dies.every(die => die.value == firstDie);

    if (allIsHeld && allTheSame) setGameOver(true);
  }

  console.log('App re-rendered');
  return (
    <main>
      {/* {gameOver && <Confetti width={416} height={400} />} */}
      <h1 className="title">Tenzies Game</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{dies.map(die => <Die key={die.id} die={die} heldHandler={heldHandler} />)}</div>
      <button className="roll-btn" onClick={rollHandler}>
        {gameOver ? "Rest Game" : 'Roll'}
      </button>
      <div className="counter">{counter}</div>
    </main>
  );
};

export default App;
