import { useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import i18next from 'i18next';

import { AddExpenseVars, DeleteExpenseVars, EditExpenseVars } from 'api/types';
import { FormConfig } from 'components/CustomForm';
import { CustomToast } from 'components/CustomToast';
import { useTranslationPrefix } from 'config/i18n';
import { useAddExpense } from 'hooks/api/expenses/useAddExpense';
import { useDeleteExpense } from 'hooks/api/expenses/useDeleteExpense';
import { useEditExpense } from 'hooks/api/expenses/useEditExpense';
import { Category } from 'models/Category';
import { Expense } from 'models/Expense';

export type UpdateExpenseVars = {
  date: number;
  expense: string;
  note: string;
};

export const formConfig: FormConfig[] = [
  {
    key: 'date',
    name: i18next.t('updateExpense.form.date'),
    required: false,
    type: 'date',
  },
  {
    key: 'note',
    name: i18next.t('updateExpense.form.note'),
    required: false,
    type: 'text',
  },
  {
    key: 'expense',
    name: i18next.t('updateExpense.form.expense'),
    required: true,
    type: 'number',
  },
];

export const useUpdateExpenseUseCase = (expense?: Expense) => {
  const t = useTranslationPrefix('updateExpense');
  const { goBack } = useNavigation();

  const initValue = useMemo(() => {
    return {
      expense: `${expense?.value ? expense?.value : ''}`,
      note: `${expense?.name ? expense?.name : ''}`,
      date: `${expense?.creationDate ? expense?.creationDate : ''}`,
    };
  }, [expense?.creationDate, expense?.name, expense?.value]);

  const title = useMemo(() => (expense ? t('update') : t('create')), [expense, t]);

  const { mutateAsync: addExpenseAsync, isLoading: addExpenseLoading } = useAddExpense();
  const { mutateAsync: editExpenseAsync, isLoading: editExpenseLoading } = useEditExpense();
  const { mutateAsync: deleteExpenseAsync, isLoading: deleteExpenseLoading } = useDeleteExpense();

  const addExpense = async (payload: AddExpenseVars) => {
    try {
      await addExpenseAsync({ payload });
      CustomToast.success(t('createExpenseSuccess'));
      goBack();
    } catch (e) {
      CustomToast.error();
    }
  };

  const editExpense = async (payload: EditExpenseVars) => {
    try {
      await editExpenseAsync({ payload });
      CustomToast.success(t('editExpenseSuccess'));
      goBack();
    } catch (e) {
      CustomToast.error();
    }
  };

  const deleteExpense = async (payload: DeleteExpenseVars) => {
    try {
      await deleteExpenseAsync({ payload });
      CustomToast.success(t('deleteExpenseSuccess'));
      goBack();
    } catch (e) {
      CustomToast.error();
    }
  };

  const updateExpense = async ({
    form,
    category,
    expense,
  }: {
    form: UpdateExpenseVars;
    category: Category;
    expense?: Expense;
  }) => {
    const date = dayjs(form?.date ? form.date : new Date()).format('YYYY-MM-DD');

    const vars: EditExpenseVars | AddExpenseVars = {
      ...(expense && { id: expense?.id }),
      categoryId: category.id,
      name: form.note,
      value: Number(form.expense),
      creationDate: date,
    };

    isEditing(vars) ? await editExpense(vars) : await addExpense(vars);
  };

  return {
    deleteExpense,
    updateExpense,
    initValue,
    formConfig,
    title,
    loading: addExpenseLoading || editExpenseLoading || deleteExpenseLoading,
  };
};

const isEditing = (vars: EditExpenseVars | AddExpenseVars): vars is EditExpenseVars =>
  !!(vars as EditExpenseVars).id;
