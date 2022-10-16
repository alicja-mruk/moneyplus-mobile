import { useNavigation } from '@react-navigation/native';

import { LoginVars } from 'api';
import { useAuthContext } from 'contexts';
import { Route } from 'navigation';

export const useLogin = () => {
  const { login: LoginRequest } = useAuthContext();

  const navigation = useNavigation();

  const login = async (args: LoginVars) => {
    const result = await LoginRequest(args);
    if (result.status === 'success') {
      navigation.reset({
        index: 0,
        routes: [{ name: Route.SignedInTabs }],
      });
    }

    if (result.status === 'error') {
      // TODO: handle error
    }
  };

  return {
    login,
  };
};
