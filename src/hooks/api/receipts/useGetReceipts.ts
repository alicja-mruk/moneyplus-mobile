import { useQuery } from '@tanstack/react-query';

import { Endpoints } from 'api/endpoints';
import { CacheKey } from 'api/queryClient';
import { useAxiosContext } from 'contexts/AxiosContext';
import { Expense } from 'models/Expense';

export const useGetReceipts = () => {
  const { getReceipts } = useGetExpensesApi();

  return useQuery([CacheKey.Receipts], () => getReceipts());
};

// TODO: change model to common with expense
const useGetExpensesApi = () => {
  const { publicAxios } = useAxiosContext();

  const getReceipts = () => publicAxios.get<Expense[]>(Endpoints.Receipts).then(res => res.data);

  return {
    getReceipts,
  };
};
