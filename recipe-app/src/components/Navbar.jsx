import { GiKnifeFork } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to={'/'} className="logo">
        <GiKnifeFork />
        <h1>delicious</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
