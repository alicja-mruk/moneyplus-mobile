import { useMemo } from 'react';

import { Constants } from 'config/constants';
import { colorPalette } from 'config/theme/foundations/colorPalette';
import { useCategoriesWithExpense } from 'hooks/api/categories/useCategoriesWithExpense';

// if every value is 0 it causes crash
const noExpensesChartData = [
  { value: 250, color: colorPalette.gray[200], name: '' },
  { value: 250, color: colorPalette.gray[200], name: '' },
];

export const useCategoriesUseCase = () => {
  const { categoriesWithExpense, totalExpenses } = useCategoriesWithExpense();

  const chartData = useMemo(() => {
    if (categoriesWithExpense.length > 0) {
      if (categoriesWithExpense.some(category => category.totalExpense > 0)) {
        return categoriesWithExpense.map(category => {
          return {
            value: category.totalExpense,
            color: category.color,
            name: category.categoryName,
          };
        });
      }
    }

    return noExpensesChartData;
  }, [categoriesWithExpense]);

  const expenseValue = useMemo(() => {
    let trimmedZeros = totalExpenses.toString().replace(/^0+/, '');
    if (trimmedZeros.length < 1) trimmedZeros = '0';
    return `${trimmedZeros} ${Constants.CURRENCY}`;
  }, [totalExpenses]);

  return {
    chartData,
    expenseValue,
    categoriesWithExpense,
  };
};
