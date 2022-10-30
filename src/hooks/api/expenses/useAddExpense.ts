import { useMutation } from '@tanstack/react-query';

import { AddExpenseVars, EditExpenseData, Endpoints, queryClient } from 'api';
import { CacheKey } from 'api/queryClient';
import { useAxiosContext } from 'contexts';

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
