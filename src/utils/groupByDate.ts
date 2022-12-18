import { Expense } from 'models';

// TODO: fix types
export const groupByDate = (expenses: Expense[]) => {
  const groups = expenses.reduce((result, expense) => {
    const date = expense.creationDate.split('T')[0];
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(expense);
    return result;
  }, {});

  return Object.keys(groups).map(date => {
    return {
      date,
      data: groups[date] as Expense[],
    };
  });
};
