import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'native-base';

const Stack = createStackNavigator<SignedInStackParamList>();

export const SignedInStack = () => {
  return (
    <View flex="1" bg="white">
      <Text>Open up App.tsx to start working on your app!</Text>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};

type SignedInStackParamList = {};
