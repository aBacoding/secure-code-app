import React, { type FC } from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';

export const AppRoutes: FC = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<></>} />
    </RouterRoutes>
  );
};
