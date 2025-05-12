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
import React, { useEffect, useState, useRef, type FC, type RefObject } from 'react';
import { useAuthStore, getCountryFlag, useProfilePasswordStore, updateAvatar, deleteAvatar } from '@/features';
import { getInitials } from '@/shared/libs';
import type { CountryFlagData } from '@/entities/auth/sign-up';
import { useMutate } from '@/shared/hooks';
import { toast } from 'sonner';
import { handleFileChange, handleAvatarClick } from '@/entities/profile';

export const ProfileHeader: FC = () => {
  const { user, setUser } = useAuthStore();
  const [countryFlag, setCountryFlag] = useState<string>('');
  const { setState } = useProfilePasswordStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadAvatar } = useMutate(updateAvatar, {
    onSuccess: (response) => {
      const { avatar } = response.data;
      toast.success('Avatar updated successfully');
      if (user) {
        setUser({ ...user, avatar: avatar as string });
      }
    },
    onError: () => {
      toast.error('Failed to upload avatar');
    },
  });

  const { mutate: deleteAvatarMutation } = useMutate(deleteAvatar, {
    onSuccess: () => {
      toast.success('Avatar deleted successfully');
      if (user) {
        setUser({ ...user, avatar: null });
      }
    },
    onError: () => {
      toast.error('Failed to delete avatar');
    },
  });

  useEffect(() => {
    if (user?.country) {
      getCountryFlag(user.country).then((res) => {
        const data = res.data as unknown as CountryFlagData[];
        if (data?.[0]?.flags?.svg) {
          setCountryFlag(data[0].flags.svg);
        }
      });
    }
  }, [user?.country]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-6">
          <div className="relative">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(event) => handleFileChange(event, uploadAvatar)}
            />
            <Avatar
              className="h-24 w-24 cursor-pointer hover:opacity-80 duration-300 transition-opacity"
              onClick={() => handleAvatarClick(fileInputRef as RefObject<HTMLInputElement>)}
            >
              <AvatarImage
                src={user?.avatar ? `${import.meta.env.VITE_URL}${user.avatar}` : ''}
                alt={user?.full_name || ''}
                className="object-cover"
              />
              <AvatarFallback>{getInitials(user?.full_name || '')}</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-1.5">
            <CardTitle className="text-2xl flex items-center gap-2">
              {user?.full_name}
              {countryFlag && <img src={countryFlag} alt={`${user?.country} flag`} className="h-5 w-auto" />}
            </CardTitle>
            <CardDescription>{user?.email}</CardDescription>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="-ml-1" onClick={() => setState(true)}>
                Change Password
              </Button>
              {user?.avatar && (
                <Button variant="destructive" size="sm" onClick={(event) => deleteAvatarMutation(event)}>
                  Delete Avatar
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
