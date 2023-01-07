import { useMemo } from 'react';

import { useGetExpenses } from 'hooks/api/expenses/useGetExpenses';
import { useSelectExpenseRange } from 'hooks/useSelectExpenseRange';
import { groupByDate } from 'utils/groupByDate';

export const useTransactionsUseCase = () => {
  const { range, onRangeChange, rangeLabels } = useSelectExpenseRange();
  const { data } = useGetExpenses();
  const sectionData = useMemo(() => groupByDate(data ?? [], range.value), [data, range]);

  return {
    data,
    sectionData,
    range,
    onRangeChange,
    rangeLabels,
  };
};
