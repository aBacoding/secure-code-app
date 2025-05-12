import { useAnalyzeHistoryItemStore, deleteAnalyzeHistoryById, type AnalyzeHistoryItemById } from '@/features/profile';
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

interface AnalyzeHistoryDetailDialogProps {
  refetchList?: (options?: RefetchOptions) => Promise<QueryObserverResult<any>>;
}

export const AnalyzeHistoryDetailDialog: FC<AnalyzeHistoryDetailDialogProps> = ({ refetchList }) => {
  const { state, setState, itemId, setItemId } = useAnalyzeHistoryItemStore();

  const { data, isLoading, refetch } = useFetch<AnalyzeHistoryItemById>(itemId ? `/analyzer/history/${itemId}` : '', {
    enabled: !!itemId && state,
  });

  const { mutate: deleteItem, isPending: isDeleting } = useMutate(deleteAnalyzeHistoryById, {
    onSuccess: () => {
      setState(false);
      setItemId(null);
      refetch();
      if (refetchList) {
        refetchList();
      }
      toast.success('Analysis history item deleted successfully');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'Failed to delete analysis history item');
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
          <DialogTitle>Analysis Details</DialogTitle>
          <DialogDescription>
            {data?.data?.timestamp && `Created on ${formatDate(data.data.timestamp)}`}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <p className="text-muted-foreground">Loading analysis details...</p>
          </div>
        ) : data?.data ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Prompt</h3>
              <p className="mt-1 p-3 rounded-md bg-muted">{data.data.prompt}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium">Analysis Result</h3>
              <div className="mt-1 p-4 rounded-md bg-muted overflow-auto max-h-96">
                <pre className="text-sm whitespace-pre-wrap break-words">{data.data.analysisResult}</pre>
              </div>
            </div>

            {data.data.code && (
              <div>
                <h3 className="text-sm font-medium">Analyzed Code</h3>
                <div className="mt-1 p-4 rounded-md bg-muted overflow-auto max-h-96">
                  <pre className="text-sm whitespace-pre-wrap break-words">{data.data.code}</pre>
                </div>
              </div>
            )}

            {data.data.model && (
              <div>
                <h3 className="text-sm font-medium">Model</h3>
                <p className="mt-1 text-muted-foreground">{data.data.model}</p>
              </div>
            )}
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
