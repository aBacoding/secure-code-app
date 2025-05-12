import React, { type FC } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/shared/components';
import { getInitials } from '@/shared/libs';
import { useAuthStore } from '@/features/auth/shared';
import { useUserAvatarLinks } from '@/widgets/user-avatar';

export const UserAvatar: FC = () => {
  const { user } = useAuthStore();
  const links = useUserAvatarLinks();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar className="size-12">
          <AvatarImage
            src={user?.avatar ? `${import.meta.env.VITE_URL}${user.avatar}` : ''}
            alt={user?.full_name || ''}
            className="object-cover"
          />
          <AvatarFallback>{getInitials(user?.full_name || '')}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {links.map((link) => (
          <DropdownMenuItem key={link.label} className="cursor-pointer flex items-center gap-2" onClick={link.onClick}>
            {link.icon} {link.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
