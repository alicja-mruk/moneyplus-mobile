import { useQuery } from '@tanstack/react-query';

import { Endpoints } from 'api';
import { CacheKey } from 'api/queryClient';
import { useAxiosContext } from 'contexts';
import { Expense } from 'models';

export const useGetExpenseById = () => {
  const { getExpenseById } = useGetExpenseApi();

  return useQuery([CacheKey.Expenses, id], () => getExpenseById({ params: { id } }));
};

const useGetExpenseApi = () => {
  const { publicAxios } = useAxiosContext();

  const getExpenseById = ({ params }: { params: { id: string } }) =>
    publicAxios.get<Expense>(Endpoints.Expenses, { params }).then(res => res.data);

  return {
    getExpenseById,
  };
};
