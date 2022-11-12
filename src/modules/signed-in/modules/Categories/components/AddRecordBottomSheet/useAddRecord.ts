import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { AddExpenseVars } from 'api';
import { CustomToast } from 'components';
import { useAddExpense } from 'hooks/api';
import { Category } from 'models';

const COMMA = ',';

export const useAddRecord = (category: Category, onAddExpenseCallback: () => void) => {
  const { t } = useTranslation();

  const [{ expense, startState }, setExpense] = useState({ expense: '0', startState: true });
  const [note, setNote] = useState('');
  const [expenseDate, setExpenseDate] = useState<Date | null>(new Date(Date.now()));

  const { mutateAsync: addExpenseAsync } = useAddExpense();

  const onKeyboardPress = (item: string) => {
    const isComma = item === COMMA;

    setExpense(prev => {
      const disableAddCharactersAfterComma = prev.expense.split(COMMA).pop()?.length === 2;

      return {
        startState: startState && item === '0',
        expense: prev.startState
          ? item
          : (prev.expense.includes(COMMA) && isComma) ||
            (prev.expense.includes(COMMA) && disableAddCharactersAfterComma)
          ? prev.expense
          : `${prev.expense}${item}`,
      };
    });
  };

  const onClose = () => {
    setExpense({ expense: '0', startState: true });
    setNote('');
  };

  const onRemoveLastCharacter = () => {
    setExpense(prev => {
      return {
        startState: prev.expense.length < 2,
        expense: prev.expense.length === 1 ? '0' : prev.expense.slice(0, -1),
      };
    });
  };

  const onAddExpense = async () => {
    if (!category) return;

    const expenseVars: AddExpenseVars = {
      categoryId: category.id,
      name: note,
      value: Number(expense),
      creationDate: expenseDate?.toISOString(),
    };
    try {
      await addExpenseAsync({ payload: expenseVars });
      CustomToast.success(t('signedIn.categories.addExpenseSuccess'));
    } catch (e) {
      CustomToast.error();
    } finally {
      onClose();
      onAddExpenseCallback();
    }
  };

  return {
    expense,
    note,
    setNote,
    expenseDate,
    setExpenseDate,
    onRemoveLastCharacter,
    onAddExpense,
    onClose,
    onKeyboardPress,
  };
};
