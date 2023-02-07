import { useEffect, useState } from 'react';

const Die = ({ die, heldHandler }) => {
  console.log('Die re-rendered');
  return (
    <div
      className={`die ${die.isHeld && 'held'}`}
      onClick={() => heldHandler(die.id)}
    >
      {die.value}
    </div>
  );
};

export default Die;
