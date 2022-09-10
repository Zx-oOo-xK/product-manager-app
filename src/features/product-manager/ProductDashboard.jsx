import React, { useState } from 'react';
import PginationComponent from './PginationComponent';

export default function ProductDashboard() {
  const [activePage, setActivePage] = useState(2);

  return (
    <PginationComponent
      activePage={activePage}
      setActivePage={setActivePage}
      pages={10}
      display={5}
    />
  );
}
