import { ThemeProvider } from '@/app/providers';
import { BrowserRouter } from 'react-router-dom';
import React, { type FC } from 'react';
import { AppLayout } from './layout';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppLayout />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
