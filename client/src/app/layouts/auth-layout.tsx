import { useAuthStore } from '@/features/auth/shared';
import React, { type FC, type ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthLayout: FC = (): ReactElement => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Outlet />
    </div>
  );
};
