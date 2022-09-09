import React, { useState } from 'react';

import { User } from 'models';

import { AuthContext } from './AuthContext';

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);


  const login = async (email: string, password: string) => {};

  const register = async (firstName: string, lastName: string) => {};

  return <AuthContext.Provider value={{ user, login, register }}>{children}</AuthContext.Provider>;
};
