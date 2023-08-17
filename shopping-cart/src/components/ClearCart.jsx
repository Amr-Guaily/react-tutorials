import { useCartAPI } from '../context/cart-context';
import React from 'react';

const ClearCart = () => {
  const { clearCart } = useCartAPI();
  console.log('ClearCart [Re-rendered]');
  return (
    <>
      <div className="clear-btn">
        <button onClick={clearCart}>ClEAR CART</button>
      </div>
    </>
  );
};

export default React.memo(ClearCart);
