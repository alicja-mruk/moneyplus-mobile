import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Route } from 'navigation/Route';

import { Login } from './modules/Login';
import { Register } from './modules/Register';

const Stack = createStackNavigator<SignedOutStackParamList>();

export const SignedOutStack = () => {
  return (
    <Stack.Navigator initialRouteName={Route.Login}>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Route.Login} component={Login} />
        <Stack.Screen name={Route.Register} component={Register} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export type SignedOutStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
};