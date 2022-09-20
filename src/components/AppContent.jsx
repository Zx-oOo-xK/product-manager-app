/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import withSuspense from 'common/withSuspense';

const ProductRouter = React.lazy(() => import('features/product-manager'));
const Home = React.lazy(() => import('features/home/Home'))

function AppRoutes() {
  return (
    <Routes>
      <Route path="/products/*" element={withSuspense(ProductRouter)()} />
      <Route path="/home" element={withSuspense(Home)()} />
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
