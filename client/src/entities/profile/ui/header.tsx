import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components';
import React, { type FC } from 'react';
import { useAuthStore } from '@/features/auth/shared';
import { getInitials } from '@/shared/libs';

export const ProfileHeader: FC = () => {
  const { user } = useAuthStore();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.avatar || ''} alt={user?.full_name || ''} />
            <AvatarFallback>{getInitials(user?.full_name || '')}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-2xl">{user?.full_name}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
