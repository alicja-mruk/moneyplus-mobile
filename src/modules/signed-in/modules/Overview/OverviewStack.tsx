import React from 'react';
import { Platform } from 'react-native';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { Route } from 'navigation/Route';

import { Overview } from './Overview';

const cardStyleInterpolator = Platform.select({
  ios: CardStyleInterpolators.forFadeFromCenter,
  android: CardStyleInterpolators.forScaleFromCenterAndroid,
});

const Stack = createStackNavigator<OverviewStackParamList>();

export const OverviewStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Route.Overview}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyleInterpolator,
      }}>
      <Stack.Screen name={Route.Overview} component={Overview} />
    </Stack.Navigator>
  );
};

export type OverviewStackParamList = {
  Overview: undefined;
};
