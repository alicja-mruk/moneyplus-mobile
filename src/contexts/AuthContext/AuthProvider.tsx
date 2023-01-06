import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';

import { CustomToast } from 'components/CustomToast';
import { Route } from 'navigation/Route';

import { AuthContext } from './AuthContext';

type Props = {
  children: React.ReactNode;
};

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean | null;
};

export const initAuthState = {
  accessToken: 'DUPA',
  refreshToken: 'DUPA',
  authenticated: null,
};

export const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<AuthState>(initAuthState);
  const navigation = useNavigation();

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState(initAuthState);
    navigation.reset({
      index: 0,
      routes: [{ name: Route.SignedOutStack }],
    });
  };

  const saveTokensToKeychain = async ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => {
    try {
      await Keychain.setGenericPassword(accessToken, refreshToken);
      setAuthState({ accessToken, refreshToken, authenticated: true });
    } catch (e) {
      CustomToast.error('Failed to save tokens');
      await logout();
    }
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logout, saveTokensToKeychain }}>
      {children}
    </AuthContext.Provider>
  );
};
