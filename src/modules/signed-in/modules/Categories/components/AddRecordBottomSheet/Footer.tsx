import React from 'react';

import { Box, Text } from 'native-base';

import { Constants } from 'config/constants';

type Props = {
  date: Date | null;
};

export const DateFooter = ({ date }: Props) => (
  <Box bg="gray.200" w="100%" alignItems="center" p="2">
    <Text variant="label">
      {date?.toLocaleDateString(Constants.LOCALE, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })}
    </Text>
  </Box>
);
