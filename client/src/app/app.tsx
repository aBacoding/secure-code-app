import { ThemeProvider } from '@/app/providers';
import { BrowserRouter } from 'react-router-dom';
import React, { type FC } from 'react';
import { AppRoutes } from '@/app/routes';
import { Toaster } from '@/shared/components/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App: FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AppRoutes />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
