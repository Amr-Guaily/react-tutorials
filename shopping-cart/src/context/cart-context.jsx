import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import reducer, { ACTIONS } from './reducer';

const initialState = {
  isLoading: false,
  cart: [],
  totalAmount: 0,
  totalPrice: 0,
};

const CartDataContext = createContext(initialState);
const CartAPIContext = createContext({
  clearCart: () => {},
  removeItem: (itemId) => {},
  increaseAmount: (itemId) => {},
  decreaseAmount: (itemId) => {},
});

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // FUNCTIONS & METHODS:
  // 1- Clear Cart
  function clearCart() {
    dispatch({ type: ACTIONS.CLEAR_CART });
  }

  // 2- Remove Item
  function removeItem(id) {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { id } });
    trackTotal();
  }

  // 3- Increase Amount
  function increaseAmount(id) {
    dispatch({ type: ACTIONS.INCREASE_AMOUNT, payload: { id } });
    trackTotal();
  }

  // 3- Decrease Amount
  function decreaseAmount(id) {
    dispatch({ type: ACTIONS.DECREASE_AMOUNT, payload: { id } });
    trackTotal();
  }

  // 4- Track Total
  function trackTotal() {
    dispatch({ type: ACTIONS.TOTAL_AMOUNT });
    dispatch({ type: ACTIONS.TOTAL_PRICE });
  }

  // 6- Fetch Data From Api
  useEffect(() => {
    state.isLoading = true;
    fetch('https://course-api.com/react-useReducer-cart-project')
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: ACTIONS.SET_DATA,
          payload: { data, isLoading: false },
        });
        trackTotal();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api = useMemo(() => {
    return {
      clearCart,
      removeItem,
      increaseAmount,
      decreaseAmount,
    };
  }, []);

  return (
    <CartAPIContext.Provider value={api}>
      <CartDataContext.Provider value={state}>
        {children}
      </CartDataContext.Provider>
    </CartAPIContext.Provider>
  );
}

export const useCartAPI = () => useContext(CartAPIContext);
export const useCartState = () => useContext(CartDataContext);
