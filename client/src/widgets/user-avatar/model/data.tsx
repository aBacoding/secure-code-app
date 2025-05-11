import React from 'react';
import { LogOut, User } from 'lucide-react';
import { handleLogout } from '@/shared/config';

export const USER_AVATAR_LINKS = [
  {
    label: 'Profile',
    href: '/profile',
    icon: <User size={20} className="flex-shrink-0 text-foreground" />,
  },
  {
    label: 'Logout',
    icon: <LogOut size={20} className="flex-shrink-0 text-foreground" />,
    onClick: (): void => {
      handleLogout();
    },
  },
];
