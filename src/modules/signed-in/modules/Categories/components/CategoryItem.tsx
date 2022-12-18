import React, { useMemo } from 'react';

import { Circle, HStack, Pressable, Text, VStack } from 'native-base';
import { InterfacePressableProps } from 'native-base/lib/typescript/components/primitives/Pressable/types';

import { Constants } from 'config/constants';
import { Category } from 'models/Category';
import { getIconByName } from 'utils/getIconByName';

type Props = {
  totalExpense: number;
  currency?: string;
  onPress: () => void;
} & Category &
  InterfacePressableProps;

export const CategoryItem = ({
  categoryName,
  color,
  iconName,
  totalExpense,
  currency = Constants.CURRENCY,
  onPress,
  ...rest
}: Props) => {
  const expenseValue = useMemo(
    () => (totalExpense == 0 ? '0' : totalExpense.toString().replace(/^0+/, '')),
    [totalExpense],
  );

  return (
    <Pressable {...rest} onPress={onPress}>
      {({ isPressed }) => (
        <VStack
          space="1"
          justifyContent="center"
          alignItems="center"
          w="72px"
          bg={isPressed ? 'secondary.400:alpha.20' : 'transparent'}
          rounded="full">
          <Text variant="body" color={color} noOfLines={1}>
            {categoryName}
          </Text>
          <Circle size="12" bg={color}>
            {getIconByName(iconName)}
          </Circle>
          <HStack space="1" justifyContent="center">
            <Text variant="bodyBold" color={totalExpense === 0 ? 'gray.400' : color} noOfLines={1}>
              {expenseValue}
            </Text>
            <Text variant="body" color={totalExpense === 0 ? 'gray.400' : color} noOfLines={1}>
              {currency}
            </Text>
          </HStack>
        </VStack>
      )}
    </Pressable>
  );
};