import React, { type FC } from 'react';
import { Link } from 'react-router-dom';

export const Logo: FC = () => {
  return (
    <Link to="/" className="flex items-center justify-center">
      <img src="/images/logo.png" alt="logo" className="w-24 h-24 min-w-24 min-h-24 flex-shrink-0" />
    </Link>
  );
};
