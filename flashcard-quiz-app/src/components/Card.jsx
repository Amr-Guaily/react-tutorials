import React, { useEffect, useRef, useState } from 'react';

const Card = ({ card }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial');

  const frontEL = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEL.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(setMaxHeight, [card.question, card.answer, card.options]);

  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      onClick={() => setFlip(!flip)}
      style={{ height: height }}
    >
      <div className="front" ref={frontEL}>
        {card.question}
        <div className="options">
          {card.options.map((option) => (
            <div key={option}>{option}</div>
          ))}
        </div>
      </div>

      <div className="back" ref={backEl}>
        {card.answer}
      </div>
    </div>
  );
};

export default Card;
