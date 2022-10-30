import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { Endpoints, RegisterData, RegisterVars } from 'api';
import { CustomToast } from 'components';
import { useAxiosContext } from 'contexts';
import { Route } from 'navigation';

export const useRegister = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { authAxios } = useAxiosContext();

  const register = async (args: RegisterVars) => {
    try {
      await authAxios.post<RegisterVars, RegisterData>(Endpoints.Register, args);
      CustomToast.success(t('signedOut.register.userCreated'));
      navigate(Route.Login);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 409) {
          CustomToast.error(t('signedOut.register.error.userExist'));
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
