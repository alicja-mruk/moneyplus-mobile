import { useMemo } from 'react';

import { useGetExpenses } from '../expenses';

import { useGetCategories } from './useGetCategories';

export const useCategoriesWithExpense = () => {
  const { data: categories } = useGetCategories();
  const { data: expenses } = useGetExpenses();

  const categoriesWithExpense = useMemo(
    () =>
      categories?.map(category => {
        const totalExpense =
          expenses
            ?.filter(expense => expense.category.id === category.id)
            .reduce((acc, expense) => acc + expense.expenseValue, 0) ?? 0;

        return {
          ...category,
          totalExpense,
        };
      }) ?? [],
    [categories, expenses],
  );

  const totalExpenses =
    useMemo(() => expenses?.reduce((acc, expense) => acc + expense.expenseValue, 0), [expenses]) ??
    0;

  return {
    categoriesWithExpense,
    totalExpenses,
  };
};
