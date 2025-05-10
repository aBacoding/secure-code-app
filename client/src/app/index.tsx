import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';

const reactRoot = createRoot(document.getElementById('root') as HTMLElement);

reactRoot.render(<App />);
