import React from 'react';
import { Platform } from 'react-native';

import { NavigatorScreenParams } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'native-base';

import { SignedInTabs, SignedInTabsParamList } from 'modules/signed-in/SignedInTabs';
import { Splash } from 'modules/signed-out/modules/Splash';
import { SignedOutStack, SignedOutStackParamList } from 'modules/signed-out/SignedOutStack';

import { Route } from './Route';

const cardStyleInterpolator = Platform.select({
  ios: CardStyleInterpolators.forFadeFromCenter,
  android: CardStyleInterpolators.forScaleFromCenterAndroid,
});

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={Route.Splash}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyleInterpolator,
        cardStyle: { backgroundColor: colors.white },
      }}>
      <Stack.Screen name={Route.Splash} component={Splash} />
      <Stack.Screen name={Route.SignedInTabs} component={SignedInTabs} />
      <Stack.Screen name={Route.SignedOutStack} component={SignedOutStack} />
    </Stack.Navigator>
  );
};

type RootStackParamList = {
  [Route.SignedOutStack]: NavigatorScreenParams<SignedOutStackParamList>;
  [Route.SignedInTabs]: NavigatorScreenParams<SignedInTabsParamList>;
  [Route.Splash]: undefined;
};