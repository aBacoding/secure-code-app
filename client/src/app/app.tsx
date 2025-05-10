import { ThemeProvider } from '@/app/providers';
import React, { type FC, type PropsWithChildren } from 'react';
import { Header } from '@/widgets/header';

export const App: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="container">
        <Header />
        {children}
      </div>
    </ThemeProvider>
  );
};

export default App;
