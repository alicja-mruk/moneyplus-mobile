import React from 'react';
import { Platform } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { Category } from 'models/Category';
import { Expense } from 'models/Expense';
import { Route } from 'navigation/Route';

import { UpdateExpense } from '../UpdateExpense/UpdateExpense';

import { Categories } from './Categories';

const cardStyleInterpolator = Platform.select({
  ios: CardStyleInterpolators.forFadeFromCenter,
  android: CardStyleInterpolators.forScaleFromCenterAndroid,
});

const Stack = createStackNavigator<CategoriesStackParamList>();

export const CategoriesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Route.Categories}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyleInterpolator,
      }}>
      <Stack.Screen name={Route.Categories} component={Categories} />
      <Stack.Screen
        name={Route.UpdateExpense}
        component={UpdateExpense}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
};

export type CategoriesStackParamList = {
  Categories: undefined;
  UpdateExpense: { category: Category; expense?: Expense };
};

export type UpdateExpenseParamProp = RouteProp<CategoriesStackParamList, Route.UpdateExpense>;