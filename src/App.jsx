import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import withSuspense from 'common/withSuspense';

const DefaultLayout = withSuspense(React.lazy(() => import('layout/DefaultLayout')));
// const ProductRouter = React.lazy(() => import('features/product-manager'));
// const AuthRouter = React.lazy(() => import('features/auth/router'));

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/products/*" element={withSuspense(ProductRouter)()} />
//       <Route path="/auth/*" element={withSuspense(AuthRouter)()} />
//     </Routes>
//   );
// }

export default function App() {
  return (
    <div style={{ backgroundColor: 'black' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<DefaultLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
