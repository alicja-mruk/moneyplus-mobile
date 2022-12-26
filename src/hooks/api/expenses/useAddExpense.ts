import { useMutation } from '@tanstack/react-query';

import { Endpoints } from 'api/endpoints';
import { CacheKey, queryClient } from 'api/queryClient';
import { AddExpenseVars, EditExpenseData } from 'api/types';
import { useAxiosContext } from 'contexts/AxiosContext';

export const useAddExpense = () => {
  const { addExpense } = useAddExpenseApi();

  return useMutation(addExpense, {
    onMutate: async ({ payload: newExpense }) => {
      await queryClient.cancelQueries([CacheKey.Expenses]);

      const previousExpenses = queryClient.getQueryData([CacheKey.Expenses]);

      queryClient.setQueryData([CacheKey.Expenses], old => [...old, newExpense]);

      return { previousExpenses };
    },
    onError: (err, expense, context) => {
      queryClient.setQueryData([CacheKey.Expenses], context?.previousExpenses);
    },
    onSettled: () => {
      queryClient.invalidateQueries([CacheKey.Expenses]);
    },
  });
};

const useAddExpenseApi = () => {
  const { publicAxios } = useAxiosContext();

  const addExpense = ({ payload }: { payload: AddExpenseVars }) =>
    publicAxios
      .post<AddExpenseVars, EditExpenseData>(Endpoints.EditExpenses, payload)
      .then(res => res.data);

  return {
    addExpense,
  };
};
