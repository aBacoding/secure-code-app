import { ProfileContent, ProfileHeader } from '@/entities/profile';
import { ChangePasswordDialog } from '@/features/profile'
import React, { type FC } from 'react';

export const ProfilePage: FC = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-6">
        <ProfileHeader />
        <ProfileContent />
        <ChangePasswordDialog />
      </div>
    </div>
  );
};
