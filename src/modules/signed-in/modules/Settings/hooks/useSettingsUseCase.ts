import { useTranslationPrefix } from 'config/i18n';
import { useAuthContext } from 'contexts/AuthContext';
import { useGetProfile } from 'hooks/api/user/useGetProfile';

import { UserInfoProps } from '../UserInfo';

export const useSettingsUseCase = () => {
  const t = useTranslationPrefix('signedIn.settings');

  const { data, isLoading } = useGetProfile();
  const { logout } = useAuthContext();

  const userInfoData: UserInfoProps[] = [
    {
      label: t('user.email'),
      value: data?.email,
    },
    {
      label: t('user.firstName'),
      value: data?.firstName,
    },
    {
      label: t('user.lastName'),
      value: data?.lastName,
    },
    {
      label: t('user.age'),
      value: data?.age?.toString(),
    },
  ];

  return {
    userInfoData,
    data,
    isLoading,
    logout,
  };
};
