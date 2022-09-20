import { useParams } from 'react-router-dom';
import CuisineItem from '../components/CuisineItem';
import useFetch from '../custom hooks/useFetch';
import { motion } from 'framer-motion';

const Cuisine = () => {
  const { type } = useParams();
  const { data, isLoading } = useFetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=9&cuisine=${type}`
  );

  return (
    <motion.div
      className="grid-system"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading && <h2>Loading...</h2>}
      {data.map((item) => (
        <CuisineItem key={item.id} item={item} />
      ))}
    </motion.div>
  );
};

export default Cuisine;
