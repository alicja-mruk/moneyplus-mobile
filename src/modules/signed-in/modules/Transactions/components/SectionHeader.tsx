import React from 'react';

import { HStack, Text } from 'native-base';

import { Constants } from 'config/constants';

type Props = {
  dateFormatted: Date;
  totalSectionExpense: number;
};

export const SectionHeader = ({ dateFormatted, totalSectionExpense }: Props) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <HStack justifyContent="space-between" alignItems="center" bg="gray.200" p="3">
      <Text variant="bodyBold">{dateFormatted.toLocaleDateString('en-GB', options)}</Text>
      <Text color="warning.200" variant="h3">
        - {totalSectionExpense} {Constants.CURRENCY}
      </Text>
    </HStack>
  );
};
