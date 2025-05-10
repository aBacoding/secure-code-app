import { HEADER_LINKS } from '@/widgets/header';
import { Logo } from '@/widgets/logo';
import { ThemeToggle } from '@/widgets/theme-toggle';
import React, { type FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="flex items-center justify-between">
      <Logo />
      <nav>
        <ul className="flex items-center gap-10">
          {HEADER_LINKS.map((link) => (
            <li key={link.href} className="cursor-pointer">
              {link.label}
            </li>
          ))}
        </ul>
      </nav>
      <div className="bg-background text-foreground">Test</div>

      <ThemeToggle />
    </header>
  );
};
