import React from 'react';
import { ListRenderItemInfo } from 'react-native';

import { Button, FlatList, Text, VStack } from 'native-base';

type Props = {
  onKeyboardPress: (item: string) => void;
};

export const Keyboard = ({ onKeyboardPress }: Props) => {
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '', '0', ','];
  const renderKey = ({ item }: ListRenderItemInfo<string>) => {
    return (
      <Button
        disabled={item.length === 0}
        variant="ghost"
        w="20"
        h="20"
        borderColor="gray.200"
        borderWidth="1"
        borderRadius="0"
        onPress={() => item.length > 0 && onKeyboardPress(item)}>
        <VStack alignItems="center" justifyContent="center">
          <Text variant="label" fontSize="2xl">
            {item}
          </Text>
        </VStack>
      </Button>
    );
  };

  return (
    <FlatList
      scrollEnabled={false}
      data={keys}
      numColumns={3}
      renderItem={renderKey}
      keyExtractor={item => item}
    />
  );
};
