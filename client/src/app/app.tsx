import { ThemeProvider } from '@/app/providers';
import { BrowserRouter } from 'react-router-dom';
import React, { type FC } from 'react';
import { AppRoutes } from '@/app/routes';
import { Toaster } from '@/shared/components/ui';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
