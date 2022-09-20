import useFetch from '../custom hooks/useFetch';
import Carousel from './Carousel';

const Vege = () => {
  const { data } = useFetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`,
    'vege'
  );

  return (
    <div className="carousel">
      <h3 className="title">Our Vegetarian Pickes</h3>
      <Carousel data={data} perPage={3} />
    </div>
  );
};

export default Vege;
