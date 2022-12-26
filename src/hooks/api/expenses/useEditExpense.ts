import { useMutation } from '@tanstack/react-query';

import { Endpoints } from 'api/endpoints';
import { CacheKey, queryClient } from 'api/queryClient';
import { EditExpenseData, EditExpenseVars } from 'api/types';
import { useAxiosContext } from 'contexts/AxiosContext';

export const useEditExpense = () => {
  const { editExpense } = useEditExpenseApi();

  return useMutation(editExpense, {
    onMutate: async ({ payload: newExpense }) => {
      await queryClient.cancelQueries([CacheKey.Expenses, newExpense.id]);

      const previousTodo = queryClient.getQueryData([CacheKey.Expenses, newExpense.id]);

      queryClient.setQueryData([CacheKey.Expenses, newExpense.id], newExpense);

      return { previousTodo, newExpense };
    },
    onError: (err, expense, context) => {
      queryClient.setQueryData([CacheKey.Expenses, context?.newExpense.id], context?.previousTodo);
    },
    onSettled: data => {
      queryClient.invalidateQueries([CacheKey.Expenses, data?.expense?.id]);
    },
  });
};

const useEditExpenseApi = () => {
  const { publicAxios } = useAxiosContext();

  const editExpense = ({ payload }: { payload: EditExpenseVars }) =>
    publicAxios
      .put<EditExpenseVars, EditExpenseData>(Endpoints.EditExpenses, payload)
      .then(res => res.data);

  return {
    editExpense,
  };
};
