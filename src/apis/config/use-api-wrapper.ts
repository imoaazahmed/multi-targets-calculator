/**
 * @name use-api-wrapper
 * @author Moaaz Ahmed
 * @summary Custom hooks for fetching and mutating data via react-query.
 * @access private
 *
 * Please don't make any changes to this file.
 */

import {
  MutationFunction,
  QueryFunction,
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';

type QueryWrapperArgs<TQueryFnData, TError, TData, TQueryKey extends QueryKey> = [
  identifier: TQueryKey,
  apiFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
];

type MutationWrapperArgs<TData, TError, TVariables, TContext> = [
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>,
];

/**
 * Custom hook for data fetching actions using react-query.
 */
export function useQueryWrapper<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(...args: QueryWrapperArgs<TQueryFnData, TError, TData, TQueryKey>): UseQueryResult<TData, TError> {
  const [identifier, apiFn, options = {}] = args;
  return useQuery<TQueryFnData, TError, TData, TQueryKey>(identifier, apiFn, {
    ...options,
  });
}

/**
 * Custom hook for data mutation actions using react-query.
 */
export function useMutationWrapper<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  ...args: MutationWrapperArgs<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  const [mutationFn, options = {}] = args;
  return useMutation<TData, TError, TVariables, TContext>(mutationFn, { ...options });
}
