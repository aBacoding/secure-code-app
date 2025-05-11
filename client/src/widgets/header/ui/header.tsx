import { HEADER_LINKS } from '@/widgets/header';
import { Logo } from '@/widgets/logo';
import { ThemeToggle } from '@/widgets/theme-toggle';
import { UserAvatar } from '@/widgets/user-avatar';
import React, { type FC } from 'react';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <header className="flex items-center justify-between gap-8 px-5 sticky top-0 z-10 bg-background border-b border-border">
      <Logo />
      <nav>
        <ul className="flex items-center gap-10">
          {HEADER_LINKS.map((link) => (
            <li key={link.href} className="cursor-pointer">
              <Link to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-6">
        <ThemeToggle />
        <UserAvatar />
      </div>
    </header>
  );
};
