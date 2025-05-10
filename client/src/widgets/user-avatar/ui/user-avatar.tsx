import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components';
import { getInitials } from '@/shared/libs'
import React, { type FC } from 'react';

export const UserAvatar: FC = () => {
  return (
    <Avatar className="size-12">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>{getInitials('John Doe')}</AvatarFallback>
    </Avatar>
  );
};
