import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { Endpoints } from 'api/endpoints';
import { LoginData, LoginVars } from 'api/types';
import { useAuthContext } from 'contexts/AuthContext';
import { useAxiosContext } from 'contexts/AxiosContext';
import { Route } from 'navigation/Route';


export const useLogin = () => {
  const { setAuthState, saveTokensToKeychain } = useAuthContext();
  const { authAxios } = useAxiosContext();

  const navigation = useNavigation();

  const login = async (args: LoginVars) => {
    try {
      const {
        data: { accessToken, refreshToken },
      } = await authAxios.post<LoginVars, LoginData>(Endpoints.Login, args);

      setAuthState({
        accessToken,
        refreshToken,
        authenticated: true,
      });
      saveTokensToKeychain({ accessToken, refreshToken });
      navigation.reset({
        index: 0,
        routes: [{ name: Route.SignedInTabs }],
      });
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        // TODO: handle error
      }
    }
  };

  return {
    login,
  };
};
