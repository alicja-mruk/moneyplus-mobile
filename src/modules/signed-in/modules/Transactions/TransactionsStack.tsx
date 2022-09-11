import React from 'react';
import { Platform } from 'react-native';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { Route } from 'navigation';

import { Transactions } from './Transactions';

const cardStyleInterpolator = Platform.select({
  ios: CardStyleInterpolators.forFadeFromCenter,
  android: CardStyleInterpolators.forScaleFromCenterAndroid,
});

const Stack = createStackNavigator<TransactionsStackParamList>();

export const TransactionsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Route.Transactions}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyleInterpolator,
      }}>
      <Stack.Screen name={Route.Transactions} component={Transactions} />
    </Stack.Navigator>
  );
};

export type TransactionsStackParamList = {
  Transactions: undefined;
};
