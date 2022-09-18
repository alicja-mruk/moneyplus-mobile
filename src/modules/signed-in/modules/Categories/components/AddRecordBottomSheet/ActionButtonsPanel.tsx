import React from 'react';

import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import { IconButton, VStack } from 'native-base';

type Props = {
  onRemoveLastCharacter: () => void;
  openPickDateModal: () => void;
  isAddExpenseButtonDisabled: boolean;
  categoryColor?: string;
  onAddExpense: () => void;
};

export const ActionButtonsPanel = ({
  onRemoveLastCharacter,
  openPickDateModal,
  isAddExpenseButtonDisabled,
  categoryColor,
  onAddExpense,
}: Props) => {
  return (
    <VStack>
      <IconButton
        borderWidth="1"
        borderColor="gray.200"
        _pressed={{
          _light: { bg: 'secondary.100:alpha.20' },
        }}
        onPress={onRemoveLastCharacter}
        h="20"
        w="20"
        borderRadius="0"
        icon={<MaterialIcons name="delete-outline" size={24} color="gray" />}
      />
      <IconButton
        onPress={openPickDateModal}
        borderWidth="1"
        borderColor="gray.200"
        _pressed={{
          _light: { bg: 'secondary.100:alpha.20' },
        }}
        variant="ghost"
        h="20"
        w="20"
        borderRadius="0"
        icon={<Entypo name="calendar" size={24} color="gray" />}
      />
      <IconButton
        onPress={onAddExpense}
        isDisabled={isAddExpenseButtonDisabled}
        _disabled={{
          _light: { bg: 'secondary.100:alpha.70' },
        }}
        _pressed={{
          _light: { bg: 'secondary.100:alpha.70' },
        }}
        h="40"
        w="20"
        borderRadius="0"
        bg={categoryColor}
        icon={<Feather name="check" size={24} color="white" />}
      />
    </VStack>
  );
};
