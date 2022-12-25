import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { Endpoints } from 'api/endpoints';
import { RegisterData, RegisterVars } from 'api/types';
import { CustomToast } from 'components/CustomToast';
import { useTranslationPrefix } from 'config/i18n';
import { useAxiosContext } from 'contexts/AxiosContext';
import { Route } from 'navigation/Route';

export const useRegister = () => {
  const t = useTranslationPrefix('signedOut.register');
  const { navigate } = useNavigation();
  const { authAxios } = useAxiosContext();

  const register = async (args: RegisterVars) => {
    try {
      await authAxios.post<RegisterVars, RegisterData>(Endpoints.Register, args);
      CustomToast.success(t('userCreated'));
      navigate(Route.Login);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 409) {
          CustomToast.error(t('error.userExist'));
          return;
        }
      }
      CustomToast.error();
    }
  };

  return {
    register,
  };
};
