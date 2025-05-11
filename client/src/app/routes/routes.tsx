import React, { type FC } from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { AppLayout, AuthLayout, NotFoundLayout } from '@/app/layouts';
import { MainPage, NotFoundPage, SignInPage, SignUpPage } from '@/pages';

export const AppRoutes: FC = () => {
  return (
    <RouterRoutes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<MainPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/sign/in" element={<SignInPage />} />
        <Route path="/sign/up" element={<SignUpPage />} />
      </Route>
      <Route element={<NotFoundLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </RouterRoutes>
  );
};
