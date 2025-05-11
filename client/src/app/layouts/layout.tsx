import { useAuthStore } from '@/features/auth/shared';
import { Header, Footer } from '@/widgets';
import React, { type FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AppLayout: FC = () => {
  const { isAuthenticated, setUser, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token && isAuthenticated) {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [isAuthenticated, setUser, setIsAuthenticated]);

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
