import dayjs from 'dayjs';

import { AddExpenseVars, EditExpenseVars } from 'api/types';
import { CustomToast } from 'components/CustomToast';
import { useAddExpense } from 'hooks/api/expenses/useAddExpense';
import { useEditExpense } from 'hooks/api/expenses/useEditExpense';
import { Category } from 'models/Category';
import { Expense } from 'models/Expense';

export type UpdateExpenseForm = {
  form: {
    date: number;
    expense: number;
    note: string;
  };
};

export const useUpdateExpenseUseCase = () => {
  const { mutateAsync: addExpenseAsync } = useAddExpense();
  const { mutateAsync: editExpenseAsync } = useEditExpense();

  const addExpense = async (payload: AddExpenseVars) => {
    try {
      await addExpenseAsync({ payload });
    } catch (e) {
      CustomToast.error();
    }
  };

  const editExpense = async (payload: EditExpenseVars) => {
    try {
      await editExpenseAsync({ payload });
    } catch (e) {
      CustomToast.error();
    }
  };

  const updateExpense = async ({
    form,
    category,
    expense,
  }: {
    form: UpdateExpenseForm;
    category: Category;
    expense?: Expense;
  }) => {
    const date = dayjs(form.form.date).format('DD-MM-YYYY');

    const vars: EditExpenseVars | AddExpenseVars = {
      ...(expense && { id: expense?.id }),
      categoryId: category.id,
      name: form.form.note,
      value: form.form.expense,
      creationDate: date,
    };

    isEditing(vars) ? await editExpense(vars) : await addExpense(vars);
  };

  return {
    updateExpense,
  };
};

const isEditing = (vars: EditExpenseVars | AddExpenseVars): vars is EditExpenseVars =>
  !!(vars as EditExpenseVars).id;
