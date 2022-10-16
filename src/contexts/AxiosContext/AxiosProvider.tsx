import React from 'react';

import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';


import { Endpoints } from 'api';
import { Constants } from 'config/constants';
import { useAuthContext } from 'contexts';

import { AxiosContext } from './AxiosContext';

type Props = {
  children: React.ReactNode;
};

const authAxios = axios.create({
  baseURL: Constants.BASE_URL,
});

const publicAxios = axios.create({
  baseURL: Constants.BASE_URL,
});

export const AxiosProvider = ({ children }: Props) => {
  const authContext = useAuthContext();

  publicAxios.interceptors.request.use(
    config => {
      if (!config?.headers?.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.authState?.accessToken}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const refreshAuthLogic = async (failedRequest: any) => {
    const data = {
      refreshToken: authContext.authState.refreshToken,
    };

    const options = {
      method: 'POST',
      data,
      url: `${Constants.BASE_URL}/${Endpoints.refreshToken}`,
    };

    try {
      const tokenRefreshResponse = await axios(options);
      failedRequest.response.config.headers.Authorization =
        'Bearer ' + tokenRefreshResponse.data.accessToken;

      authContext.setAuthState({
        ...authContext.authState,
        accessToken: tokenRefreshResponse.data.accessToken,
      });

      authContext.saveTokensToKeychain({
        accessToken: tokenRefreshResponse.data.accessToken,
        refreshToken: authContext.authState.refreshToken,
      });
    } catch {
      authContext.setAuthState({
        accessToken: '',
        refreshToken: '',
        authenticated: false,
      });
    }
  };

  createAuthRefreshInterceptor(publicAxios, refreshAuthLogic, {});

  return (
    <AxiosContext.Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </AxiosContext.Provider>
  );
};
