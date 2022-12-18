import React from 'react';

import { Circle, Divider, HStack, Text, VStack } from 'native-base';

import { Constants } from 'config/constants';
import { CategoryWithExpense } from 'hooks/api/categories/useCategoriesWithExpense';
import { getIconByName } from 'utils/getIconByName';

type Props = {
  item: CategoryWithExpense;
  currency?: string;
};

export const OverviewItem = ({ item, currency = Constants.CURRENCY }: Props) => (
  <>
    <HStack space="4" alignItems="center" justifyContent="space-between" my="1">
      <HStack space="4" alignItems="center">
        <Circle size="12" bg={item.color} mt="2">
          {getIconByName(item?.iconName)}
        </Circle>
        <VStack>
          <Text variant="body" color={item?.color} noOfLines={1}>
            {item?.categoryName}
          </Text>
        </VStack>
      </HStack>
      <VStack alignItems="flex-end">
        <Text variant="body" noOfLines={1}>
          {item.totalExpense} {currency}
        </Text>
        <Text>{item.totalExpensePercentage}%</Text>
      </VStack>
    </HStack>
    <Divider bg="gray.200" mt="2" />
  </>
);
