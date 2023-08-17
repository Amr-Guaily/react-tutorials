import { useCartAPI } from '../context/cart-context';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import React from 'react';
const CartItem = ({ cartItem }) => {
  const { removeItem, increaseAmount, decreaseAmount } = useCartAPI();
  const { title, price, img, amount, id } = cartItem;

  console.log(`CartItem [Re-rendered]`);

  return (
    <div className="cart-item">
      <div className="image">
        <img src={img} alt={title} />
      </div>
      <div className="info">
        <h5 className="name">{title}</h5>
        <p className="price">$ {price}</p>
        <button className="remove-btn" onClick={() => removeItem(id)}>
          remove
        </button>
      </div>
      <div className="amount">
        <FaAngleUp className="angle" onClick={() => increaseAmount(id)} />
        <small>{amount}</small>
        <FaAngleDown className="angle" onClick={() => decreaseAmount(id)} />
      </div>
    </div>
  );
};

export default React.memo(CartItem);
