import { useMemo } from 'react';

import dayjs from 'dayjs';
import i18next from 'i18next';

import { AddExpenseVars, EditExpenseVars } from 'api/types';
import { FormConfig } from 'components/CustomForm';
import { CustomToast } from 'components/CustomToast';
import { useTranslationPrefix } from 'config/i18n';
import { useAddExpense } from 'hooks/api/expenses/useAddExpense';
import { useEditExpense } from 'hooks/api/expenses/useEditExpense';
import { Category } from 'models/Category';
import { Expense } from 'models/Expense';

export type UpdateExpenseForm = {
  form: UpdateExpenseVars;
};

export type UpdateExpenseVars = {
  date: number;
  expense: number;
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

  const initValue = useMemo(() => {
    return {
      expense: `${expense?.value ? expense?.value : ''}`,
      note: `${expense?.name ? expense?.name : ''}`,
      date: `${expense?.creationDate ? expense?.creationDate : ''}`,
    };
  }, [expense?.creationDate, expense?.name, expense?.value]);

  const title = useMemo(() => (expense ? t('update') : t('create')), [expense, t]);

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
    form: UpdateExpenseVars;
    category: Category;
    expense?: Expense;
  }) => {
    const date = dayjs(form.date).format('DD-MM-YYYY');

    const vars: EditExpenseVars | AddExpenseVars = {
      ...(expense && { id: expense?.id }),
      categoryId: category.id,
      name: form.note,
      value: form.expense,
      creationDate: date,
    };

    console.log({ vars });
    console.log({ isEditing: isEditing(vars) });
    // isEditing(vars) ? await editExpense(vars) : await addExpense(vars);
  };;

  return {
    updateExpense,
    initValue,
    formConfig,
    title,
  };
};

const isEditing = (vars: EditExpenseVars | AddExpenseVars): vars is EditExpenseVars =>
  !!(vars as EditExpenseVars).id;
