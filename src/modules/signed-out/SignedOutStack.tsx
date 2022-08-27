import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'native-base';

import { SignedOutStackParamList } from '.';

const Stack = createStackNavigator<SignedOutStackParamList>();

export const SignedOutStack = () => {
  return (
    <View>
      <Text>SignedOutStack</Text>
    </View>
  );
};
