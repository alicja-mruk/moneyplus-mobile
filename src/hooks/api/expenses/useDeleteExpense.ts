import { useMutation } from '@tanstack/react-query';

import { Endpoints } from 'api/endpoints';
import { CacheKey, queryClient } from 'api/queryClient';
import { DeleteExpenseVars, EditExpenseData } from 'api/types';
import { useAxiosContext } from 'contexts/AxiosContext';

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
