import React from 'react';

import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Circle, HStack, Pressable, Text, VStack } from 'native-base';
import { InterfacePressableProps } from 'native-base/lib/typescript/components/primitives/Pressable/types';

import { Constants } from 'config/constants';
import { Category, CategoryIconName } from 'models/Category';

type Props = {
  currency?: string;
  onPress: () => void;
} & Category &
  InterfacePressableProps;

export const CategoryItem = ({
  title,
  color,
  iconName,
  amount,
  currency = Constants.CURRENCY,
  onPress,
  ...rest
}: Props) => {
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
          <Text variant="body" color="primary.100" noOfLines={1}>
            {title}
          </Text>
          <Circle size="12" bg={color}>
            {getIconByName(iconName)}
          </Circle>
          <HStack space="1" justifyContent="center">
            <Text variant="bodyBold" color={amount === 0 ? 'gray.400' : color} noOfLines={1}>
              {amount}
            </Text>
            <Text variant="body" color={amount === 0 ? 'gray.400' : color} noOfLines={1}>
              {currency}
            </Text>
          </HStack>
        </VStack>
      )}
    </Pressable>
  );
};

const getIconByName = (name: CategoryIconName) => {
  const commonProps = { size: 24, color: 'white' };
  switch (name) {
    case 'groceries':
      return <MaterialIcons name="local-grocery-store" {...commonProps} />;
    case 'restaurant':
      return <Ionicons name="restaurant" {...commonProps} />;
    case 'leasure':
      return <MaterialIcons name="local-movies" {...commonProps} />;
    case 'transport':
      return <MaterialIcons name="emoji-transportation" {...commonProps} />;
    case 'health':
      return <AntDesign name="heart" {...commonProps} />;
    case 'gift':
      return <FontAwesome name="gift" {...commonProps} />;
    case 'family':
      return <MaterialIcons name="family-restroom" {...commonProps} />;
    case 'shopping':
      return <FontAwesome name="shopping-bag" {...commonProps} />;
    case 'every-month':
      return <AntDesign name="sync" {...commonProps} />;
  }
};
