import React from 'react';

import { Box, Button, Spinner, Text, VStack } from 'native-base';

import { ContentWrapper } from 'components/ContentWrapper';
import { useTranslationPrefix } from 'config/i18n';
import { useAuthContext } from 'contexts/AuthContext';
import { useGetProfile } from 'hooks/api/user/useGetProfile';

import { UserInfo } from './UserInfo';

export const Settings = () => {
  const t = useTranslationPrefix('signedIn.settings');
  const { logout } = useAuthContext();

  const { data, isLoading } = useGetProfile();

  const onLogoutPress = async () => {
    await logout();
  };

  return (
    <ContentWrapper justifyContent="space-between">
      <Box>
        <Text variant="h1">{t('title')}</Text>
        <Box mt="12">
          {isLoading || !data ? (
            <Spinner />
          ) : (
            <VStack space="2">
              <UserInfo label={t('user.email')} value={data.email} />
              <UserInfo label={t('user.firstName')} value={data.firstName} />
              <UserInfo label={t('user.lastName')} value={data.lastName} />
              <UserInfo label={t('user.age')} value={data.age.toString()} />
            </VStack>
          )}
        </Box>
      </Box>

      <Button onPress={onLogoutPress}>{t('logout')}</Button>
    </ContentWrapper>
  );
};