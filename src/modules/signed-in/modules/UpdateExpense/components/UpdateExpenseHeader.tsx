import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HStack, IconButton, Text } from 'native-base';

type Props = {
  title: string;
};

export const UpdateExpenseHeader = ({ title }: Props) => {
  const { goBack } = useNavigation();

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <Text variant="h3">{title}</Text>
      <IconButton onPress={goBack} size="12" alignSelf="flex-end">
        <MaterialCommunityIcons name="close" size={16} />
      </IconButton>
    </HStack>
  );
};
