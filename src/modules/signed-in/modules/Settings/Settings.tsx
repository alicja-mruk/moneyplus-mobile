import React from 'react';

import { Box, Button, Spinner, Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';

import { ContentWrapper } from 'components';
import { useAuthContext } from 'contexts';
import { useGetProfile } from 'hooks/api';

import { UserInfo } from './UserInfo';

export const Settings = () => {
  const { t } = useTranslation();
  const { logout } = useAuthContext();

  const { data, isLoading } = useGetProfile();

  const onLogoutPress = async () => {
    await logout();
  };

  return (
    <ContentWrapper justifyContent="space-between">
      <Box>
        <Text variant="h1">{t('signedIn.settings.title')}</Text>
        <Box mt="12">
          {isLoading || !data ? (
            <Spinner />
          ) : (
            <VStack space="2">
              <UserInfo label={t('signedIn.settings.user.email')} value={data.email} />
              <UserInfo label={t('signedIn.settings.user.firstName')} value={data.firstName} />
              <UserInfo label={t('signedIn.settings.user.lastName')} value={data.lastName} />
              <UserInfo label={t('signedIn.settings.user.age')} value={data.age.toString()} />
            </VStack>
          )}
        </Box>
      </Box>

      <Button onPress={onLogoutPress}>{t('signedIn.settings.logout')}</Button>
    </ContentWrapper>
  );
};