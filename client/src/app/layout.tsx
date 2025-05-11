import { Header, Footer } from '@/widgets';
import { AppRoutes } from './routes';
import React, { type FC } from 'react';

export const AppLayout: FC = () => {
  return (
    <div className="max-h-screen flex flex-col">
      <Header />
      <main className="container relative flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};
