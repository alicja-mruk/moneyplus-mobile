import React from 'react';
import { Platform } from 'react-native';

import { NavigatorScreenParams } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import {
  SignedInTabs,
  SignedInTabsParamList,
  SignedOutStack,
  SignedOutStackParamList,
  Splash,
} from 'modules';

import { Route } from './Route';

const cardStyleInterpolator = Platform.select({
  ios: CardStyleInterpolators.forFadeFromCenter,
  android: CardStyleInterpolators.forScaleFromCenterAndroid,
});

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Route.SignedOutStack}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyleInterpolator,
      }}>
      <Stack.Screen name={Route.Splash} component={Splash} />
      <Stack.Screen name={Route.SignedInTabs} component={SignedInTabs} />
      <Stack.Screen name={Route.SignedOutStack} component={SignedOutStack} />
    </Stack.Navigator>
  );
};

type RootStackParamList = {
  SignedOutStack: NavigatorScreenParams<SignedOutStackParamList>;
  SignedInTabs: NavigatorScreenParams<SignedInTabsParamList>;
  Splash: undefined;
};
