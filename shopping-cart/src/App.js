import NavBar from './components/NavBar';
import Cart from './components/Cart';

function App() {
  console.log("App [Re-rendered]");

  return (
    <>
      <NavBar />
      <Cart />
    </>
  );
}

export default App;
