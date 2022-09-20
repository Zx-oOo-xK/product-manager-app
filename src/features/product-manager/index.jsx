import withSuspense from 'common/withSuspense';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const ProductList = React.lazy(() => import('./ProductList'));
const ProductDashboard = React.lazy(() => import('./ProductDashboard'));

export default function ProductRouter() {
  return (
    <Routes>
      <Route path="/" index element={withSuspense(ProductList)()} />
      <Route path="/dashboard" element={withSuspense(ProductDashboard)()} />
    </Routes>
  );
}
