import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Button, HStack, Image, Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';

import { Container, ContentWrapper } from 'components';
import { Route } from 'navigation';

export const Register = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  const onRegisterPress = () => {
    // TODO: register
  };

  return (
    <Container>
      <ContentWrapper justifyContent="space-between">
        <VStack space="4">
          <Image source={require('assets/images/start_3.jpg')} w="100%" h="300px" />
          <Text variant="authTitle" mt="4">
            {t('signedOut.register.title')}
          </Text>

          <Button onPress={onRegisterPress}>{t('signedOut.register.register')}</Button>
        </VStack>
      </ContentWrapper>
    </Container>
  );
};
