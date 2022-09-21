import React from 'react';
import { Route, Routes } from 'react-router-dom';
import withSuspense from 'common/withSuspense';

const ProductRouter = withSuspense(React.lazy(() => import('features/product-manager')));
const Counter = withSuspense(React.lazy(() => import('features/counter')));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/products/*" element={<ProductRouter />} />
      <Route path="/c/*" element={<Counter />} />
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
