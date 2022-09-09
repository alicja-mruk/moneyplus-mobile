import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Route } from 'navigation';

import { Login, Register } from './modules';

const Stack = createStackNavigator<SignedOutStackParamList>();

export const SignedOutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Route.Login} component={Login} />
        <Stack.Screen name={Route.Register} component={Register} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

type SignedOutStackParamList = {
  Login: undefined;
  Register: undefined;
};