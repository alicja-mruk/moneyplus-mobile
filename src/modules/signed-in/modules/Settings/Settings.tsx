import React from 'react';


import { Button, Text } from 'native-base';
import { useTranslation } from 'react-i18next';

import { ContentWrapper } from 'components';
import { useAuthContext } from 'contexts';

export const Settings = () => {
  const { t } = useTranslation();
  const { logout } = useAuthContext();

  const onLogoutPress = async () => {
    await logout();
  };

  return (
    <ContentWrapper justifyContent="space-between">
      <Text variant="h1">{t('signedIn.settings.title')}</Text>
      <Button onPress={onLogoutPress}>{t('signedIn.settings.logout')}</Button>
    </ContentWrapper>
  );
};
