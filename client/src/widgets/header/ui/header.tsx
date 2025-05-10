import { Button } from '@/shared/components/ui/button';
import { Logo } from '@/widgets/logo';
import React, { type FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="bg-background text-foreground">
      <Logo />
      <Button>
        <span>Login</span>
      </Button>
    </header>
  );
};
