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
import React, { useEffect, useState, type FC } from 'react';
import { useAuthStore, getCountryFlag, useProfilePasswordStore } from '@/features';
import { getInitials } from '@/shared/libs';
import type { CountryFlagData } from '@/entities/auth/sign-up';

export const ProfileHeader: FC = () => {
  const { user } = useAuthStore();
  const [countryFlag, setCountryFlag] = useState<string>('');
  const { setState } = useProfilePasswordStore();

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
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.avatar || ''} alt={user?.full_name || ''} />
            <AvatarFallback>{getInitials(user?.full_name || '')}</AvatarFallback>
          </Avatar>
          <div className="space-y-1.5">
            <CardTitle className="text-2xl flex items-center  gap-2">
              {user?.full_name}
              {countryFlag && <img src={countryFlag} alt={`${user?.country} flag`} className="h-5 w-auto" />}
            </CardTitle>
            <CardDescription>{user?.email}</CardDescription>
            <Button variant="outline" size="sm" className="-ml-1" onClick={() => setState(true)}>
              Change Password
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
