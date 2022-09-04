import { createContext } from 'react';

import { User } from 'models';

export type AuthContextProps = {
  user: User | null;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<void>;
  // TODO: change props
  register: (firstName: string, lastName: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: async () => undefined,
  login: async () => undefined,
  register: async () => undefined,
});

AuthContext.displayName = 'AuthContext';
