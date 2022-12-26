import React from 'react';

import { Button, Text } from 'native-base';

import { ContentWrapper } from 'components/ContentWrapper';
import { useTranslationPrefix } from 'config/i18n';

import { UserInfoList } from './components/UserInfoList';
import { useSettingsUseCase } from './hooks/useSettingsUseCase';

export const Settings = () => {
  const t = useTranslationPrefix('signedIn.settings');

  const { userInfoData, data, isLoading, logout } = useSettingsUseCase();

  const onLogoutPress = async () => {
    await logout();
  };

  return (
    <ContentWrapper>
      <Text variant="h1">{t('title')}</Text>
      <UserInfoList isLoading={isLoading} data={data} userInfoData={userInfoData} />
      <Button onPress={onLogoutPress}>{t('logout')}</Button>
    </ContentWrapper>
  );
};