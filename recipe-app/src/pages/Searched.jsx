import useFetch from '../custom hooks/useFetch';
import { useParams } from 'react-router-dom';
import CuisineItem from '../components/CuisineItem';

const Searched = () => {
  const { searchValue } = useParams();
  const { data, isLoading } = useFetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${searchValue}`
  );

  return (
    <div className="grid-system">
      {isLoading && <h2>Loading...</h2>}
      {data.map((item) => (
        <CuisineItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Searched;
