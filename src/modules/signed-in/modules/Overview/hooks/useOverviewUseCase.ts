import { useMemo, useState } from 'react';

import { useTheme } from 'native-base';

import { useCategoriesWithExpense } from 'hooks/api/categories/useCategoriesWithExpense';

export const useOverviewUseCase = () => {
  const { colors } = useTheme();
  const { categoriesWithExpense } = useCategoriesWithExpense();

  const [showAll, setShowAll] = useState(false);

  const data = useMemo(() => {
    const sortedByPercentage = categoriesWithExpense.sort(
      (a, b) => b.totalExpensePercentage - a.totalExpensePercentage,
    );

    return showAll ? sortedByPercentage : sortedByPercentage.slice(0, 3);
  }, [categoriesWithExpense, showAll]);

  const chartData = useMemo(
    () =>
      data.map(item => {
        const legendFontSize = 12;
        const legendFontColor = colors.black;
        return {
          ...item,
          legendFontSize,
          legendFontColor,
          name: `% ${item.categoryName}`,
        };
      }),
    [colors.black, data],
  );

  const isEmpty = useMemo(() => data.every(item => item.totalExpense === 0), [data]);

  return {
    data,
    chartData,
    showAll,
    setShowAll,
    isEmpty,
  };
};
