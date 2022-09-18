import { useState } from 'react';

const COMMA = ',';

export const useAddRecord = () => {
  const [{ expense, startState }, setExpense] = useState({ expense: '0', startState: true });
  const [note, setNote] = useState('');
  const [expenseDate, setExpenseDate] = useState<Date | null>(new Date(Date.now()));

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

  const onAddExpense = () => [
    // TODO: CALL API
  ];

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
