import { createContext } from 'react';



import { AuthState, initAuthState } from './AuthProvider';

export type AuthContextProps = {
  authState: AuthState;
  setAuthState: (authState: AuthState) => void;
  login: (email: string, password: string) => Promise<void>;
  // TODO: change props
  register: (firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>({
  authState: initAuthState,
  setAuthState: () => undefined,
  login: async () => undefined,
  register: async () => undefined,
  logout: async () => undefined,
});

AuthContext.displayName = 'AuthContext';
