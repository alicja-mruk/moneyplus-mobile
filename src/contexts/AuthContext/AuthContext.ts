import { createContext } from 'react';

import { LoginVars, RegisterVars } from 'api';

import { AuthState } from './AuthProvider';
import { LoginResult, RegisterResult } from './types';

export type AuthContextProps = {
  authState: AuthState;
  setAuthState: (authState: AuthState) => void;
  login: (args: LoginVars) => Promise<LoginResult>;
  register: (args: RegisterVars) => Promise<RegisterResult>;
  logout: () => Promise<void>;
  saveTokensToKeychain: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string | null;
  }) => void;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

AuthContext.displayName = 'AuthContext';
