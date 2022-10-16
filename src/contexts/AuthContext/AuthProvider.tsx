import React, { useState } from 'react';

import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import { Endpoints, LoginData, LoginVars, RegisterData, RegisterVars } from 'api';
import { useAxiosContext } from 'contexts/AxiosContext';

import { AuthContext } from './AuthContext';
import {
  KeychainKeys,
  LoginErrorReason,
  LoginResult,
  RegisterErrorReason,
  RegisterResult,
} from './types';

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
  const { authAxios } = useAxiosContext();

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState(initAuthState);
  };

  const login = async (args: LoginVars): Promise<LoginResult> => {
    try {
      const {
        data: { accessToken, refreshToken },
      } = await authAxios.post<LoginVars, LoginData>(Endpoints.login, args);
      setAuthState({
        accessToken,
        refreshToken,
        authenticated: true,
      });
      saveTokensToKeychain({ accessToken, refreshToken });
      return { status: 'success' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // TODO: handle error
      }
      return { status: 'error', reason: LoginErrorReason.UNKNOWN };
    }
  };

  const register = async (args: RegisterVars): Promise<RegisterResult> => {
    try {
      await authAxios.post<RegisterVars, RegisterData>(Endpoints.register, args);
      return { status: 'success' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 409) {
          return { status: 'error', reason: RegisterErrorReason.USER_EXISTS };
        }
      }
      return { status: 'error', reason: RegisterErrorReason.UNKNOWN };
    }
  };

  const saveTokensToKeychain = async ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string | null;
  }) => {
    await Keychain.setGenericPassword(accessToken, refreshToken ?? '');
  };

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState, login, register, logout, saveTokensToKeychain }}>
      {children}
    </AuthContext.Provider>
  );
};
