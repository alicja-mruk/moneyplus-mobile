import { createContext } from 'react';

import { AuthState } from './AuthProvider';

export type AuthContextProps = {
  authState: AuthState;
  setAuthState: (authState: AuthState) => void;
  logout: () => Promise<void>;
  saveTokensToKeychain: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

AuthContext.displayName = 'AuthContext';
