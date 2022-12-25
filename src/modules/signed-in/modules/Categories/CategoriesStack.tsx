import React from 'react';
import { Platform } from 'react-native';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';


import { Route } from 'navigation/Route';

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
    </Stack.Navigator>
  );
};

export type CategoriesStackParamList = {
  Categories: undefined;
};
