import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProductDashboard() {
  return (
    <div>
      <Skeleton count={3} width="75%" height="2" />
    </div>
  );
}
