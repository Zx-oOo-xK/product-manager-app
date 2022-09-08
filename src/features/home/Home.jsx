import React from 'react';
import AppSidebar from 'components/Sidenav';

export default function Home({ username }) {
  return (
    <div>
      {username}
      <AppSidebar />
    </div>
  );
}
