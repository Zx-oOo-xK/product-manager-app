import React from 'react';
import AppContent from 'components/AppContent';
import AppHeader from 'components/AppHeader';
import AppSidebar from 'components/AppSidebar';
import './style.scss';

export default function DefaultLayout() {
  return (
    <div style={{ display: 'block' }}>
      <AppSidebar className="AppSidebar" />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader className="AppHeader px-3" />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
    </div>
  );
}
