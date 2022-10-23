import React from 'react';

import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { Endpoints, LoginData, RefreshTokenVars } from 'api';
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
    const requestData = {
      refreshToken: authContext.authState.refreshToken,
    };

    try {
      const { data } = await axios.post<RefreshTokenVars, LoginData>(
        `${Constants.BASE_URL}/${Endpoints.RefreshToken}`,
        requestData,
      );

      failedRequest.response.config.headers.Authorization = 'Bearer ' + data.accessToken;

      authContext.setAuthState({
        ...authContext.authState,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      authContext.saveTokensToKeychain({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
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
