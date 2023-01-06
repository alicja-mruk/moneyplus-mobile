import { useState } from 'react';

import { useTranslationPrefix } from 'config/i18n';

export enum ExpenseRange {
  DAY,
  WEEK,
  MONTH,
  YEAR,
  ALL,
}

export type RangeType = {
  range: ExpenseRange;
  label: string;
};

interface ISelectExpenseRange {
  range: RangeType;
  onRangeChange: (range: ExpenseRange) => void;
}

export const useSelectExpenseRange = (): ISelectExpenseRange => {
  const t = useTranslationPrefix('singedIn.expenses.range');

  const [range, setRange] = useState<{ range: ExpenseRange; label: string }>({
    range: ExpenseRange.ALL,
    label: t('all'),
  });

  const onRangeChange = (expenseRange: ExpenseRange) => {
    const label = getLabel(expenseRange);
    setRange({ range: expenseRange, label });
  };

  const getLabel = (expenseRange: ExpenseRange) => {
    switch (expenseRange) {
      case ExpenseRange.DAY:
        return t('day');
      case ExpenseRange.WEEK:
        return t('week');
      case ExpenseRange.MONTH:
        return t('month');
      case ExpenseRange.YEAR:
        return t('year');
      case ExpenseRange.ALL:
        return t('all');
    }
  };

  return {
    range,
    onRangeChange,
  };
};
