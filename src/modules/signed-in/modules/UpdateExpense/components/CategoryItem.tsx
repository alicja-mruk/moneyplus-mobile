import React from 'react';

import { Circle, HStack, Text } from 'native-base';

import { Category } from 'models/Category';
import { getIconByName } from 'utils/getIconByName';

type CategoryProps = {
  category: Category;
};

export const CategoryIcon = ({ category }: CategoryProps) => (
  <HStack alignItems="center" space="4" mt="4">
    <Circle size="12" bg={category?.color}>
      {getIconByName(category?.iconName)}
    </Circle>
    <Text>{category?.categoryName}</Text>
  </HStack>
);
