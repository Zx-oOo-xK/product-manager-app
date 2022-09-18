import withSuspense from 'common/withSuspense';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const ProductList = React.lazy(() => import('./ProductList'));
const ProductDashboard = React.lazy(() => import('./ProductDashboard'));
const ProductForm = React.lazy(() => import('./ProductForm'));

export default function ProductRouter() {
  return (
    <Routes>
      <Route path="/" index element={withSuspense(ProductList)()} />
      <Route path="/dashboard" element={withSuspense(ProductDashboard)()} />
      <Route path="/:id/update" element={withSuspense(ProductForm)()} />
      <Route path="/new" element={withSuspense(ProductForm)()} />
    </Routes>
  );
}
