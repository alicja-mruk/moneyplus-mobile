import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HStack, IconButton, Text } from 'native-base';

type Props = {
  title: string;
  showRemoveButton: boolean;
  onDeleteExpensePress: () => void;
};

export const UpdateExpenseHeader = ({ title, showRemoveButton, onDeleteExpensePress }: Props) => {
  const { goBack } = useNavigation();

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <Text variant="h3">{title}</Text>
      <HStack space="1">
        {showRemoveButton && (
          <IconButton onPress={onDeleteExpensePress} size="12" alignSelf="flex-end">
            <MaterialCommunityIcons name="delete" size={16} />
          </IconButton>
        )}
        <IconButton onPress={goBack} size="12" alignSelf="flex-end">
          <MaterialCommunityIcons name="close" size={16} />
        </IconButton>
      </HStack>
    </HStack>
  );
};
