import withSuspense from 'common/withSuspense';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const ProductList = withSuspense(React.lazy(() => import('./ProductList')));
const ProductDashboard = withSuspense(React.lazy(() => import('./ProductDashboard')));
const ProductForm = withSuspense(React.lazy(() => import('./ProductForm')));

export default function ProductRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />}>
        <Route path="/new" element={<ProductForm />} />
        <Route path="/:id/update" element={<ProductForm />} />
      </Route>
      <Route path="/dashboard" element={<ProductDashboard />} />
    </Routes>
  );
}
