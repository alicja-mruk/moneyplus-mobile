import React, { useState } from 'react';

import * as Keychain from 'react-native-keychain';

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
  accessToken: null,
  refreshToken: null,
  authenticated: null,
};

export const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<AuthState>(initAuthState);

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState(initAuthState);
  };

  const login = async (email: string, password: string) => {};

  const register = async (firstName: string, lastName: string) => {};

  return (
    <AuthContext.Provider value={{ authState, setAuthState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
