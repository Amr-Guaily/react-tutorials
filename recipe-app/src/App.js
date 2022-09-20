import { Route, Routes, useLocation } from 'react-router-dom';

import Categories from './components/Categories';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Cuisine from './pages/Cuisine';
import Details from './pages/Details';
import Home from './pages/Home';
import Searched from './pages/Searched';

import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <div className="container">
      <Navbar />
      <Search />
      <Categories />

      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/cuisine/:type" element={<Cuisine />} />
          <Route path="/searched/:searchValue" element={<Searched />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
