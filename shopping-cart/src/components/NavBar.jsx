import { useCartState } from '../context/cart-context';
import { FaShoppingCart } from 'react-icons/fa';

const NavBar = () => {
  const { totalAmount } = useCartState();

  console.log('Navbar [Re-rendered]');

  return (
    <nav>
      <div className="navbar">
        <h1 className="logo">Shopping Cart</h1>
        <div className="cart-icon">
          <FaShoppingCart />
          <div className="bage">{totalAmount}</div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
