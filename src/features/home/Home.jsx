import React from 'react';
import AppSidebar from 'components/AppSidebar';

export default function Home({ username }) {
  return (
    <div>
      {username}
      <AppSidebar />
    </div>
  );
}
