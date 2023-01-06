import React from 'react';
import { Platform } from 'react-native';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { Route } from 'navigation/Route';

import { Settings } from './Settings';

const cardStyleInterpolator = Platform.select({
  ios: CardStyleInterpolators.forFadeFromCenter,
  android: CardStyleInterpolators.forScaleFromCenterAndroid,
});

const Stack = createStackNavigator<SettingsStackParamList>();

export const SettingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Route.Settings}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyleInterpolator,
      }}>
      <Stack.Screen name={Route.Settings} component={Settings} />
    </Stack.Navigator>
  );
};

export type SettingsStackParamList = {
  Settings: undefined;
};
