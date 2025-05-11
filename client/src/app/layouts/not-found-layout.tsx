import React, { Fragment, type FC, type ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets';

export const NotFoundLayout: FC = (): ReactElement => {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
};
