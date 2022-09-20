const Die = ({ value, isHeld, holdDice }) => {
  return (
    <div className={`die ${isHeld ? 'held' : ''}`} onClick={holdDice}>
      {value}
    </div>
  );
};

export default Die;
