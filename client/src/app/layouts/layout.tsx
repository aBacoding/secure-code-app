import { useAuthStore } from '@/features/auth/shared';
import { Header, Footer } from '@/widgets';
import React, { type FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export const AppLayout: FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/sign/in" />;
  }

  return (
    <div className="max-h-screen max-w-screen flex flex-col">
      <Header />
      <main className="relative flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
