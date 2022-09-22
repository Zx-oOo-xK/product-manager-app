import React from 'react';
import AppToast from 'components/AppToast';

export default function ProductDashboard() {
  return (
    <div>
      <AppToast description="this is a toast" title="toast" color="danger" delay={2000} />
    </div>
  );
}
