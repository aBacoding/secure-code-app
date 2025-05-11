import { MainHero, MainFeatures, MainCta } from '@/entities/main';
import React, { type FC, type ReactElement } from 'react';

export const MainPage: FC = (): ReactElement => {
  return (
    <div>
      <MainHero />
      <MainFeatures />
      <MainCta />
    </div>
  );
};
