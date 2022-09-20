import Card from './Card';

const CardsList = ({ cardList }) => {
  return (
    <div className="card-grid">
      {cardList.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardsList;
