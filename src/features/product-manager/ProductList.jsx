import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './productSlice';

export default function ProductList() {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return <div>{product}</div>;
}
