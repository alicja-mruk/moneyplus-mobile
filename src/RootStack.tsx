import React from 'react';
import { Platform } from 'react-native';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { useAuthContext } from 'contexts';
import { SignedInStack, SignedOutStack } from 'modules';
import { RootStackParamList } from 'types';

const cardStyleInterpolator = Platform.select({
  ios: CardStyleInterpolators.forFadeFromCenter,
  android: CardStyleInterpolators.forScaleFromCenterAndroid,
});

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { user } = useAuthContext();

  return (
    <Stack.Navigator
      initialRouteName="SignedOutStack"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyleInterpolator,
      }}>
      {user ? (
        <Stack.Screen name="SignedInStack" component={SignedInStack} />
      ) : (
        <Stack.Screen name="SignedOutStack" component={SignedOutStack} />
      )}
    </Stack.Navigator>
  );
};
