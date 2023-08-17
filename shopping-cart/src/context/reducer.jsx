export const ACTIONS = {
  CLEAR_CART: 'clear-cart',
  REMOVE_ITEM: 'remove-item',
  INCREASE_AMOUNT: 'increase-amount',
  DECREASE_AMOUNT: 'decrease-amount',
  TOTAL_AMOUNT: 'total-amount',
  TOTAL_PRICE: 'total-price',
  SET_DATA: 'set-data',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SET_DATA: {
      return { ...state, cart: payload.data, isLoading: payload.isLoading };
    }

    case ACTIONS.CLEAR_CART:
      return { ...state, cart: [] };

    case ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload.id),
      };

    case ACTIONS.INCREASE_AMOUNT:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === payload.id ? { ...item, amount: item.amount + 1 } : item
        ),
      };

    case ACTIONS.DECREASE_AMOUNT:
      const newCart = state.cart
        .map((item) =>
          item.id === payload.id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount !== 0);
      return {
        ...state,
        cart: newCart,
      };

    case ACTIONS.TOTAL_AMOUNT:
      const totalAmount = state.cart.reduce(
        (total, item) => (total += item.amount),
        0
      );
      return { ...state, totalAmount };

    case ACTIONS.TOTAL_PRICE:
      let totalPrice = state.cart.reduce((total, item) => {
        total += +item.price * item.amount;
        return parseFloat(total.toFixed(2));
      }, 0);

      return { ...state, totalPrice };

    default:
      return state;
  }
}

export default reducer;
