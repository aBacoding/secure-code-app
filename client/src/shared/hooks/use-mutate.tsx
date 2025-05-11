import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

type MutationFn<TData, TVariables> = (variables: TVariables) => Promise<TData>;

interface UseMutateOptions<TData, TVariables, TError = AxiosError>
  extends Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'> {
  onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>;
  onError?: (error: TError, variables: TVariables) => void | Promise<void>;
}

export function useMutate<TData = unknown, TVariables = unknown, TError = AxiosError>(
  mutationFn: MutationFn<TData, TVariables>,
  options?: UseMutateOptions<TData, TVariables, TError>,
): UseMutationResult<TData, TError, TVariables> {
  return useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
  });
}
