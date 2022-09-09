import { createContext } from 'react';

import axios, { AxiosInstance } from 'axios';

export type AxiosContextProps = {
  authAxios: AxiosInstance;
  publicAxios: AxiosInstance;
};

export const AxiosContext = createContext<AxiosContextProps>({
  authAxios: axios,
  publicAxios: axios,
});

AxiosContext.displayName = 'AxiosContext';
