import React, { type FC } from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { AppLayout, AuthLayout } from '@/app/layouts';
import {
  MainPage,
  NotFoundPage,
  SignInPage,
  SignUpPage,
  ProfilePage,
  GeneratePage,
  AnalyzerPage,
  DocsPage,
} from '@/pages';

export const AppRoutes: FC = () => {
  return (
    <RouterRoutes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/analyzer" element={<AnalyzerPage />} />
        <Route path="/docs" element={<DocsPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/sign/in" element={<SignInPage />} />
        <Route path="/sign/up" element={<SignUpPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </RouterRoutes>
  );
};
