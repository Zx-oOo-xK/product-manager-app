/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import withSuspense from 'common/withSuspense';

const ProductRouter = React.lazy(() => import('features/product-manager'));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/products/*" element={withSuspense(ProductRouter)()} />
    </Routes>
  );
}

export default function AppContent() {
  return (
    <div>
      <AppRoutes />
    </div>
  );
}
