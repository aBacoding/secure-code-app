import { SignIn, SignUp } from '@/entities/auth';
import React, { type FC } from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { AppLayout } from '@/app/layouts/layout';
import { AuthLayout } from '@/app/layouts/auth-layout';

export const AppRoutes: FC = () => {
  return (
    <RouterRoutes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<></>} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/sign/in" element={<SignIn />} />
        <Route path="/sign/up" element={<SignUp />} />
      </Route>
    </RouterRoutes>
  );
};
