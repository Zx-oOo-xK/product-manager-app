import withSuspense from 'common/withSuspense';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const ProductList = React.lazy(() => import('./ProductList'));
const UpdateProduct = React.lazy(() => import('./UpdateProduct'));

export default function ProductRouter() {
  return (
    <Routes>
      <Route path="/" index element={withSuspense(ProductList)()} />
      <Route path="/:id" element={withSuspense(UpdateProduct)()} />
    </Routes>
  );
}
