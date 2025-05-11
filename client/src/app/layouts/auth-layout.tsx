import React, { type FC, type ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: FC = (): ReactElement => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Outlet />
    </div>
  );
};
