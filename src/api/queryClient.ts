import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export enum CacheKey {
  User = 'user',
  Categories = 'categories',
  Expenses = 'expenses',
}
