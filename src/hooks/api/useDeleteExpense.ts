import { useMutation } from '@tanstack/react-query';

import { DeleteExpenseVars, EditExpenseData, Endpoints } from 'api';
import { CacheKey, queryClient } from 'api/queryClient';
import { useAxiosContext } from 'contexts';

export const useDeleteExpense = () => {
  const { deleteExpense } = useDeleteExpenseApi();

  return useMutation(deleteExpense, {
    onMutate: async ({ payload: expense }) => {
      await queryClient.cancelQueries([CacheKey.Expenses]);

      const previousData = queryClient.getQueryData([CacheKey.Expenses]);

      queryClient.setQueryData([CacheKey.Expenses], old =>
        old.filter(item => item.id !== expense.id),
      );

      return { previousData };
    },
  });
};

const useDeleteExpenseApi = () => {
  const { publicAxios } = useAxiosContext();

  const deleteExpense = ({ payload }: { payload: DeleteExpenseVars }) =>
    publicAxios
      .delete<DeleteExpenseVars, EditExpenseData>(Endpoints.EditExpenses, { data: payload })
      .then(res => res.data);

  return {
    deleteExpense,
  };
};
