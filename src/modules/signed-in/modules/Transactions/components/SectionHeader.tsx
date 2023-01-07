import React, { useMemo } from 'react';

import { HStack, Text } from 'native-base';

import { Constants } from 'config/constants';
import { ExpenseRange } from 'hooks/useSelectExpenseRange';

type Props = {
  date: Date;
  totalSectionExpense: number;
  range: ExpenseRange;
};

const getOptionsByExpenseRange = (expenseRange: ExpenseRange) => {
  switch (expenseRange) {
    case ExpenseRange.MONTH:
      return { year: 'numeric', month: 'long' } as Intl.DateTimeFormatOptions;
    case ExpenseRange.YEAR:
      return { year: 'numeric' } as Intl.DateTimeFormatOptions;
    default:
      return {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      } as Intl.DateTimeFormatOptions;
  }
};

export const SectionHeader = ({ date, totalSectionExpense, range }: Props) => {
  const _date = useMemo(() => {
    const options = getOptionsByExpenseRange(range);
    return date.toLocaleDateString('en-GB', options);
  }, [date, range]);

  return (
    <HStack justifyContent="space-between" alignItems="center" bg="gray.200" p="3">
      <Text variant="bodyBold">{_date}</Text>
      <Text color="warning.200" variant="h3">
        - {totalSectionExpense} {Constants.CURRENCY}
      </Text>
    </HStack>
  );
};
