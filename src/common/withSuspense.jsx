/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

export default function withSuspense(Component, fallback = <div>Loading...</div>) {
  return function SuspenseComponent(props) {
    return (
      <React.Suspense fallback={fallback}>
        <Component {...props} />
      </React.Suspense>
    );
  };
}
