import React from 'react';

import { Box, Circle, Divider, HStack, Text, VStack } from 'native-base';

import { Constants } from 'config/constants';
import { Expense } from 'models/Expense';
import { getIconByName } from 'utils/getIconByName';

type Props = {
  item: Expense;
};

export const TransactionListItem = ({ item }: Props) => {
  return (
    <Box mx="4">
      <HStack space="4" alignItems="center" justifyContent="space-between" bg="transparent">
        <HStack space="4" alignItems="center">
          <Circle size="12" bg={item?.category?.color} mt="2">
            {getIconByName(item?.category?.iconName)}
          </Circle>

          <VStack>
            <Text variant="body" color={item?.category?.color} noOfLines={1}>
              {item?.category?.categoryName}
            </Text>
            <Text variant="body" color={item?.category?.color} noOfLines={1}>
              {item?.name}
            </Text>
          </VStack>
        </HStack>

        <Text variant="body" color="red.500" noOfLines={1}>
          - {item?.value} {Constants.CURRENCY}
        </Text>
      </HStack>
      <Divider bg="gray.200" mt="2" />
    </Box>
  );
};
