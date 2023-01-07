import { useState } from 'react';

import { useTranslationPrefix } from 'config/i18n';

export enum ExpenseRange {
  MONTH = 'month',
  YEAR = 'year',
  ALL = 'all',
}

export type RangeType = {
  value: ExpenseRange;
  label: string;
};

interface ISelectExpenseRange {
  range: RangeType;
  onRangeChange: (range: ExpenseRange) => void;
  rangeLabels: { value: string; label: string }[];
}

export const useSelectExpenseRange = (): ISelectExpenseRange => {
  const t = useTranslationPrefix('signedIn.expenses.range');

  const [range, setRange] = useState<RangeType>({
    value: ExpenseRange.ALL,
    label: t('all'),
  });

  const onRangeChange = (expenseRange: ExpenseRange) => {
    const label = getLabel(expenseRange);
    setRange({ value: expenseRange, label });
  };

  const getLabel = (expenseRange: ExpenseRange) => {
    switch (expenseRange) {
      case ExpenseRange.MONTH:
        return t('month');
      case ExpenseRange.YEAR:
        return t('year');
      case ExpenseRange.ALL:
        return t('all');
    }
  };

  const rangeLabels = Object.values(ExpenseRange).map(value => {
    const label = getLabel(value);
    return {
      value,
      label,
    };
  });

  return {
    range,
    onRangeChange,
    rangeLabels,
  };
};
