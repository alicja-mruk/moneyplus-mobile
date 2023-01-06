import { useMemo } from 'react';

import { Category } from 'models/Category';

import { useGetExpenses } from '../expenses/useGetExpenses';

import { useGetCategories } from './useGetCategories';

export type CategoryWithExpense = Category & {
  totalExpense: number;
  totalExpensePercentage: number;
};

export const useCategoriesWithExpense = () => {
  const { data: categories } = useGetCategories();
  const { data: expenses } = useGetExpenses();

  const totalExpenses = useMemo(
    () => expenses?.reduce((acc, expense) => acc + expense.value, 0) ?? 0,
    [expenses],
  );

  const categoriesWithExpense = useMemo(() => {
    if (!categories) return [] as CategoryWithExpense[];

    return categories.map(category => {
      const expensesFromCategory = expenses?.filter(
        expense => expense?.category?.id === category.id,
      );

      const totalExpense =
        expensesFromCategory?.reduce((acc, expense) => acc + expense.value, 0) ?? 0;

      return {
        ...category,
        totalExpense: Number(totalExpense.toFixed(2)),
        totalExpensePercentage:
          totalExpenses === 0 ? 0 : parseFloat(((totalExpense / totalExpenses) * 100).toFixed(2)),
      };
    });
  }, [categories, expenses, totalExpenses]);

  return {
    categoriesWithExpense,
    totalExpenses,
  };
};
