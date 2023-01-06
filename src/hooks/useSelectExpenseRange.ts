import { useState } from 'react';

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
  onRangeChange: (range: RangeType) => void;
}

export const useSelectExpenseRange = (): ISelectExpenseRange => {
  const [range, setRange] = useState<{ range: ExpenseRange; label: string }>({
    range: ExpenseRange.ALL,
    label: '',
  });

  const onRangeChange = (_range: RangeType) => {
    setRange(_range);
  };

  return {
    range,
    onRangeChange,
  };
};
