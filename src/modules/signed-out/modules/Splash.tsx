import React, { useCallback, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Spinner, Text, VStack } from 'native-base';
import * as Keychain from 'react-native-keychain';

import { useAuthContext } from 'contexts';
import { Route } from 'navigation';

export const Splash = () => {
  const navigation = useNavigation();
  const authContext = useAuthContext();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      // get value
      const jwt = JSON.parse(value.password);

      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.error(`Keychain Error: ${error}`);
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, [authContext]);

  useEffect(() => {
    loadJWT();
  }, []);

  useEffect(() => {
    if (status === 'success') {
      navigation.reset({
        index: 0,
        routes: [{ name: Route.SignedInTabs }],
      });

      return;
    }
    if (status === 'error') navigation.navigate(Route.Login);
  }, [navigation, status]);

  return (
    <VStack flex="1" justifyContent="center" alignItems="center" bg="white">
      {status === 'loading' ? <Spinner /> : <Text>Welcome!</Text>}
    </VStack>
  );
};
