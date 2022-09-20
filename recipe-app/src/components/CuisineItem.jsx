import { Link } from 'react-router-dom';

const CuisineItem = ({ item }) => {
  const { id, title, image } = item;

  return (
    <Link className="card" to={`/details/${id}`}>
      <img src={image} alt={title} />
      <h4 className="name">{title}</h4>
    </Link>
  );
};

export default CuisineItem;
