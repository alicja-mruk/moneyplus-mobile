import React from 'react';

import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';

import { Constants } from 'config/constants';
import { useAuthContext } from 'contexts';

import { AxiosContext } from './AxiosContext';

type Props = {
  children: React.ReactNode;
};

export const AxiosProvider = ({ children }: Props) => {
  const authContext = useAuthContext();

  // TODO: change api
  const authAxios = axios.create({
    baseURL: Constants.BASE_URL,
  });

  const publicAxios = axios.create({
    baseURL: Constants.BASE_URL,
  });

  authAxios.interceptors.request.use(
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
      url: `${Constants.BASE_URL}/refreshToken`,
    };

    try {
      const tokenRefreshResponse = await axios(options);
      failedRequest.response.config.headers.Authorization =
        'Bearer ' + tokenRefreshResponse.data.accessToken;

      authContext.setAuthState({
        ...authContext.authState,
        accessToken: tokenRefreshResponse.data.accessToken,
      });

      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken: tokenRefreshResponse.data.accessToken,
          refreshToken: authContext.authState.refreshToken,
        }),
      );
    } catch {
      authContext.setAuthState({
        accessToken: '',
        refreshToken: '',
        authenticated: false,
      });
    }
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

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
