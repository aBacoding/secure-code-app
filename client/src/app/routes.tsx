import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';

export const AppRoutes: React.FC = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<></>} />
    </RouterRoutes>
  );
};
