import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Button, HStack, Image, Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';

import { BaseInput, Container, ContentWrapper } from 'components';
import { Route } from 'navigation';

export const Login = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  const onLoginPress = () => {
    // TODO: login
  };

  return (
    <Container>
      <ContentWrapper justifyContent="space-between">
        <VStack space="4">
          <Image source={require('assets/images/start_1.jpg')} w="100%" h="300px" />
          <Text variant="authTitle" mt="4">
            {t('signedOut.login.title')}
          </Text>

          <Button onPress={onLoginPress}>{t('signedOut.login.login')}</Button>
        </VStack>
        <HStack justifyContent="center">
          <Text variant="subtitle">{t('signedOut.login.newUser')} </Text>
          <Text
            variant="subtitle"
            color="tertiary.200"
            fontWeight="600"
            onPress={() => navigate(Route.Register)}>
            {t('signedOut.login.register')}
          </Text>
        </HStack>
      </ContentWrapper>
    </Container>
  );
};
