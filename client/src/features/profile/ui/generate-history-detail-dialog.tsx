import {
  useGenerateHistoryItemStore,
  deleteGenerateHistoryById,
  type GenerateHistoryItemById,
} from '@/features/profile';
import { type ErrorResponse } from '@/shared/types';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components';
import { type AxiosError } from 'axios';
import React, { useEffect, type FC } from 'react';
import { toast } from 'sonner';
import { formatDate } from '@/shared/libs/utils';
import { useFetch, useMutate } from '@/shared/hooks';
import { type QueryObserverResult, type RefetchOptions } from '@tanstack/react-query';

interface GenerateHistoryDetailDialogProps {
  refetchList?: (options?: RefetchOptions) => Promise<QueryObserverResult<any>>;
}

export const GenerateHistoryDetailDialog: FC<GenerateHistoryDetailDialogProps> = ({ refetchList }) => {
  const { state, setState, itemId, setItemId } = useGenerateHistoryItemStore();

  const { data, isLoading, refetch } = useFetch<GenerateHistoryItemById>(itemId ? `/generate/history/${itemId}` : '', {
    enabled: !!itemId && state,
  });

  const { mutate: deleteItem, isPending: isDeleting } = useMutate(deleteGenerateHistoryById, {
    onSuccess: () => {
      setState(false);
      setItemId(null);
      refetch();
      if (refetchList) {
        refetchList();
      }
      toast.success('Generation history item deleted successfully');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'Failed to delete generation history item');
    },
  });

  const handleDelete = (): void => {
    if (itemId) {
      deleteItem(itemId);
    }
  };

  const handleClose = (): void => {
    setState(false);
    setItemId(null);
  };

  useEffect(() => {
    if (state && itemId) {
      refetch();
    }
  }, [state, itemId, refetch]);

  return (
    <Dialog open={state} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generation Details</DialogTitle>
          <DialogDescription>
            {data?.data?.timestamp && `Created on ${formatDate(data.data.timestamp)}`}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <p className="text-muted-foreground">Loading generation details...</p>
          </div>
        ) : data?.data ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Prompt</h3>
              <p className="mt-1 p-3 rounded-md bg-muted">{data.data.prompt}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-2 py-0.5 bg-muted text-xs rounded-full">{data.data.language}</div>
              {data.data.model && <div className="px-2 py-0.5 bg-muted text-xs rounded-full">{data.data.model}</div>}
            </div>

            <div>
              <h3 className="text-sm font-medium">Generated Code</h3>
              <div className="mt-1 p-4 rounded-md bg-muted overflow-auto max-h-96">
                <pre className="text-sm whitespace-pre-wrap break-words">{data.data.generatedCode}</pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center py-8">
            <p className="text-muted-foreground">No data found</p>
          </div>
        )}

        <DialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} loading={isDeleting}>
            Delete
          </Button>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
