import { createContext } from 'react';

import { LoginVars, RegisterVars } from 'api';

import { AuthState } from './AuthProvider';
import { RegisterResult } from './types';

export type AuthContextProps = {
  authState: AuthState;
  setAuthState: (authState: AuthState) => void;
  login: (args: LoginVars) => Promise<void>;
  register: (args: RegisterVars) => Promise<RegisterResult>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

AuthContext.displayName = 'AuthContext';
