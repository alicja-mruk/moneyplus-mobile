import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { sha256 } from 'react-native-sha256';

import { Endpoints } from 'api/endpoints';
import { LoginData, LoginVars } from 'api/types';
import { CustomToast } from 'components/CustomToast';
import { useAuthContext } from 'contexts/AuthContext';
import { useAxiosContext } from 'contexts/AxiosContext';
import { Route } from 'navigation/Route';

export const useLogin = () => {
  const { saveTokensToKeychain } = useAuthContext();
  const { authAxios } = useAxiosContext();

  const navigation = useNavigation();

  const login = async ({ email, password }: LoginVars) => {
    try {
      const encryptedPassword = await sha256(password);

      const {
        data: { accessToken, refreshToken },
      } = await authAxios.post<LoginVars, LoginData>(Endpoints.Login, {
        email,
        password: encryptedPassword,
      });
      await saveTokensToKeychain({ accessToken, refreshToken });

      navigation.reset({
        index: 0,
        routes: [{ name: Route.SignedInTabs }],
      });
    } catch (error) {
      CustomToast.error(`Login error :${error}`);
      if (axios.isAxiosError(error)) {
        // TODO: handle error
      }
    }
  };

  return {
    login,
  };
};
