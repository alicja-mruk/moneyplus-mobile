import { useQuery } from '@tanstack/react-query';

import { Endpoints } from 'api/endpoints';
import { CacheKey } from 'api/queryClient';
import { useAxiosContext } from 'contexts/AxiosContext';
import { Expense } from 'models/Expense';

export const useGetExpenses = () => {
  const { getExpenses } = useGetExpensesApi();

  return useQuery([CacheKey.Expenses], () => getExpenses());
};

const useGetExpensesApi = () => {
  const { publicAxios } = useAxiosContext();

  const getExpenses = () => publicAxios.get<Expense[]>(Endpoints.Expenses).then(res => res.data);

  return {
    getExpenses,
  };
};
