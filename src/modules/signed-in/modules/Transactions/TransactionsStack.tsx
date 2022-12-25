import React from 'react';
import { Platform } from 'react-native';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { Category } from 'models/Category';
import { Expense } from 'models/Expense';
import { Route } from 'navigation/Route';

import { UpdateExpense } from '../UpdateExpense/UpdateExpense';

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
      <Stack.Screen
        name={Route.UpdateExpense}
        component={UpdateExpense}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
};

export type TransactionsStackParamList = {
  [Route.Transactions]: undefined;
  UpdateExpense: { category: Category; expense?: Expense };
};
