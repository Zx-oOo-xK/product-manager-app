/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

export default function withSuspense(Component) {
  return function SuspenseComponent(props) {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </React.Suspense>
    );
  };
}
