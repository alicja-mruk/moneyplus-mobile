import { ExpenseRange } from 'hooks/useSelectExpenseRange';
import { Expense } from 'models/Expense';

export const groupByDate = (expenses: Expense[], expenseRange: ExpenseRange = ExpenseRange.ALL) => {
  const groups = expenses.reduce<Record<string, Expense[]>>((result, expense) => {
    const _date = expense.creationDate.split('T')[0];
    const date = getSubstringDate(_date, expenseRange);

    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(expense);
    return result;
  }, {});

  const result = Object.keys(groups).map(date => {
    return {
      date,
      data: groups[date] as Expense[],
    };
  });

  return result.sort((a, b) => b.date.localeCompare(a.date));
};

const getSubstringDate = (date: string, expenseRange: ExpenseRange) => {
  switch (expenseRange) {
    case ExpenseRange.YEAR:
      return date.substring(0, 4);
    case ExpenseRange.MONTH:
      return date.substring(0, 7);
    default:
      return date;
  }
};
