import React, { useMemo } from 'react';
import CartItem from './CartItem';

const MemoizedCartItem = ({ cartItem }) => {
  const memoizedCartItem = useMemo(() => cartItem, [cartItem]);
  return <CartItem cartItem={memoizedCartItem} />;
};

export default React.memo(MemoizedCartItem);
