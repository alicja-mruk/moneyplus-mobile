import React, { useState } from 'react';

import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import { Endpoints, LoginVars, RegisterData, RegisterVars } from 'api';
import { useAxiosContext } from 'contexts/AxiosContext';

import { AuthContext } from './AuthContext';
import { RegisterErrorReason, RegisterResult } from './types';

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

  const login = async (args: LoginVars) => {
    const response = await authAxios.post<LoginVars>(Endpoints.login, args);
    console.log(response);
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

  return (
    <AuthContext.Provider value={{ authState, setAuthState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
