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
        <AppHeader className="AppHeader" />
        <div className="body flex-grow-1 p-sm-0 p-md-2 p-lg-4" style={{ backgroundColor: '#0001' }}>
          <AppContent />
        </div>
      </div>
    </div>
  );
}
