import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

const Categories = () => {
  return (
    <div className="categories-list">
      <NavLink to={'/cuisine/Italian'}>
        <FaPizzaSlice />
        <h6>Italian</h6>
      </NavLink>

      <NavLink to={'/cuisine/American'}>
        <FaHamburger />
        <h6>American</h6>
      </NavLink>

      <NavLink to={'/cuisine/Thai'}>
        <GiNoodles />
        <h6>Thai</h6>
      </NavLink>

      <NavLink to={'/cuisine/Japanese'}>
        <GiChopsticks />
        <h6>Japanese</h6>
      </NavLink>
    </div>
  );
};

export default Categories;
