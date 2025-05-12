import { useAuthStore } from '@/features/auth/shared';
import React, { type FC, type ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AUTH_ROUTES } from '@/shared/config';

export const AuthLayout: FC = (): ReactElement => {
  const token = Cookies.get('token');
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated && token && AUTH_ROUTES.includes(window.location.pathname)) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Outlet />
    </div>
  );
};
