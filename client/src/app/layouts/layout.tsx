import { Header, Footer } from '@/widgets';
import React, { type FC } from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout: FC = () => {
  return (
    <div className="max-h-screen max-w-screen flex flex-col">
      <Header />
      <main className="container relative flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
