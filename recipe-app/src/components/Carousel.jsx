import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import CuisineItem from './CuisineItem';

const Carousel = ({ data, perPage }) => {
  return (
    <>
      <Splide
        options={{
          perPage: perPage,
          gap: '1.5rem',
          pagination: false,
          arrows: false,
        }}
      >
        {data.map((item) => {
          return (
            <SplideSlide key={item.id}>
              <CuisineItem item={item} />
            </SplideSlide>
          );
        })}
      </Splide>
    </>
  );
};

export default Carousel;
