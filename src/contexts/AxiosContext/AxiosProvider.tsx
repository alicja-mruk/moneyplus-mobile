import React from 'react';

import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';

import { Endpoints } from 'api/endpoints';
import { LoginData, RefreshTokenVars } from 'api/types';
import { Constants } from 'config/constants';
import { useAuthContext } from 'contexts/AuthContext';

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
      if (!config.headers) config.headers = {};
      if (!config?.headers?.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.authState.accessToken}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const refreshAuthLogic = async (failedRequest: any) => {
    const jwt = await Keychain.getGenericPassword();
    const oldRefreshToken = jwt.password;

    if (oldRefreshToken === null) {
      await authContext.logout();
    }

    const requestData = {
      refreshToken: oldRefreshToken,
    };

    try {
      const {
        data: { accessToken, refreshToken },
      } = await axios.post<RefreshTokenVars, LoginData>(
        `${Constants.BASE_URL}/${Endpoints.RefreshToken}`,
        requestData,
      );

      await authContext.saveTokensToKeychain({
        accessToken,
        refreshToken,
      });

      failedRequest.response.config.headers.Authorization = 'Bearer ' + accessToken;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 400) {
          await authContext.logout();
          console.error('Refresh token expired or invalid');
        }
      }
      console.error('RefreshAuthLogic error');
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
