import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import React, { useEffect, useState } from 'react';
import Die from './components/Die';

const App = () => {
  const [dies, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Check the dice array for these winning conditions:
    // 1- Check all dice are held
    const allIsHeld = dies.every((die) => die.isHeld === true);
    // 2- check all dice have the same value?
    // hint: if all hve the same value..then i could pick one the dice,
    // and check all of them to see that they have that same value.
    const firstValue = dies[0].value;
    const allTheSame = dies.every((die) => die.value === firstValue);
    if (allIsHeld && allTheSame) {
      setTenzies(true);
    }
  }, [dies]);

  function randomDieValue() {
    return Math.ceil(Math.random() * 6);
  }

  function generateNewDie() {
    return {
      id: nanoid(),
      isHeld: false,
      value: randomDieValue(),
    };
  }

  function allNewDice() {
    const allDice = [];
    for (let i = 0; i < 10; i++) {
      allDice.push(generateNewDie());
    }
    return allDice;
  }

  function rollDice() {
    // setDice(allNewDice());
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setCounter((prevCount) => prevCount + 1);
    } else {
      setDice(allNewDice());
      setTenzies(false);
      setCounter(0);
    }
  }

  function holdDice(dieId) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === dieId ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dies.map(({ id, value, isHeld }) => (
    <Die key={id} value={value} isHeld={isHeld} holdDice={() => holdDice(id)} />
  ));

  return (
    <main>
      {tenzies && <Confetti width={416} height={400} />}
      <h1 className="title">Tenzies Game</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceElements}</div>
      <button className="roll-btn" onClick={rollDice}>
        {tenzies ? 'Rest Game' : 'Roll'}
      </button>
      <div className="counter">{counter}</div>
    </main>
  );
};

export default App;
