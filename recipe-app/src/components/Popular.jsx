import useFetch from '../custom hooks/useFetch';
import Carousel from './Carousel';

const Popular = () => {
  const { data } = useFetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`,
    'popular'
  );

  return (
    <div className="carousel">
      <h3 className="title">Trending</h3>
      <Carousel data={data} perPage={4} />
    </div>
  );
};

export default Popular;
