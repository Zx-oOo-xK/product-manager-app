import React from 'react';
import withSuspense from 'common/withSuspense';
import { Route, Routes } from 'react-router-dom';

const SignIn = React.lazy(() => import('./signin'));

export default function AuthRouter() {
  return (
    <Routes>
      <Route path="/signin" element={withSuspense(SignIn)()} />
    </Routes>
  );
}
