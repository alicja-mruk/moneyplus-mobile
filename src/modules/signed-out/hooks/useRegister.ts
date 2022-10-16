import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { RegisterVars } from 'api';
import { CustomToast } from 'components';
import { useAuthContext } from 'contexts';
import { RegisterErrorReason } from 'contexts/AuthContext';
import { Route } from 'navigation';

export const useRegister = () => {
  const { register: registerRequest } = useAuthContext();
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  const register = async (args: RegisterVars) => {
    try {
      const result = await registerRequest(args);
      if (result.status === 'success') {
        CustomToast.success(t('signedOut.register.userCreated'));
        navigate(Route.Login);
        return;
      }
      if (result.status === 'error') {
        switch (result.reason) {
          case RegisterErrorReason.USER_EXISTS: {
            CustomToast.success(t('signedOut.register.error.userExist'));
            break;
          }
          default: {
            CustomToast.error();
            break;
          }
        }
      }
    } catch (e) {
      CustomToast.error();
    }
  };

  return {
    register,
  };
};
