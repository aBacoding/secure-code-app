import { ThemeProvider } from '@/app/providers';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Header } from '@/widgets/header';
import React, { type FC } from 'react';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="container relative flex-1">
            <AppRoutes />
          </main>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
