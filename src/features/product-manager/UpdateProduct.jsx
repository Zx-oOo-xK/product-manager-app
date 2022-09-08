import React from 'react';
import { useParams } from 'react-router-dom';

export default function UpdateProduct() {
  const { id } = useParams();
  // eslint-disable-next-line no-console
  console.log(id);

  return <div>update product {id}</div>;
}
