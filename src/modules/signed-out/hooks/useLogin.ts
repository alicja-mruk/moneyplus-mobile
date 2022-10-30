import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { Endpoints, LoginData, LoginVars } from 'api';
import { useAuthContext, useAxiosContext } from 'contexts';
import { Route } from 'navigation';

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
