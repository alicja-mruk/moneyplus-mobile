import { createContext } from 'react';

import { AxiosInstance } from 'axios';

export type AxiosContextProps = {
  authAxios: AxiosInstance;
  publicAxios: AxiosInstance;
};

export const AxiosContext = createContext<AxiosContextProps>({} as AxiosContextProps);

AxiosContext.displayName = 'AxiosContext';
