/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import AppContent from 'components/AppContent';
import AppHeader from 'components/AppHeader';
import AppSidebar from 'components/AppSidebar';

export default function DefaultLayout() {
  const [toggle, setToggle] = useState(false);

  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  return (
    <div style={{ display: 'block' }}>
      <AppSidebar visible={toggle} toggle={toggleSidebar} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader toggle={toggleSidebar} />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
    </div>
  );
}
