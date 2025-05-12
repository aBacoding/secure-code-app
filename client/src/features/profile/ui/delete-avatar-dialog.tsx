import { useAuthStore } from '@/features/auth';
import { deleteAvatar, useProfileAvatarStore } from '@/features/profile';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from '@/shared/components';
import { useMutate } from '@/shared/hooks';
import React, { type FC } from 'react';
import { toast } from 'sonner';

export const DeleteAvatarDialog: FC = () => {
  const { state, setState } = useProfileAvatarStore();
  const { user, setUser } = useAuthStore();

  const { mutate, isPending } = useMutate(deleteAvatar, {
    onSuccess: () => {
      toast.success('Avatar deleted successfully');
      if (user) {
        setUser({ ...user, avatar: null });
      }
      setState(false);
    },
    onError: () => {
      toast.error('Failed to delete avatar');
    },
  });

  return (
    <Dialog open={state} onOpenChange={setState}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Avatar</DialogTitle>
          <DialogDescription>Are you sure you want to delete your avatar?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setState(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={(event) => mutate(event)} disabled={isPending} loading={isPending}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
