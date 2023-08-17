import React from 'react';
import { useCartState } from '../context/cart-context';
import Loader from './Loader';
import ClearCart from './ClearCart';
import MemoizedCartItem from './MemoizedCartItem ';

const Cart = () => {
  const { totalPrice, cart, isLoading } = useCartState();

  console.log('Cart [Re-rendered]');
  return (
    <main className="cart-container">
      <div className="title">Your Bug</div>

      {isLoading ? (
        <Loader />
      ) : cart.length > 0 ? (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <MemoizedCartItem key={item.id} cartItem={item} />
            ))}
          </div>

          <hr />

          <div className="total-price">
            <h3>Total</h3>
            <p>$ {totalPrice}</p>
          </div>
          <ClearCart />
        </>
      ) : (
        <h4 className="empty-cart">Empty Cart...</h4>
      )}
    </main>
  );
};

export default Cart;
