import { Expense } from 'models/Expense';

export const groupByDate = (expenses: Expense[]) => {
  const groups = expenses.reduce<Record<string, Expense[]>>((result, expense) => {
    const date = expense.creationDate.split('T')[0];
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
