import React from 'react';

import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import { Button, HStack, Image, Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';

import { Container, ContentWrapper, CustomForm } from 'components';
import { FormConfig, RenderFooterType } from 'components/CustomForm';
import { Route } from 'navigation';

export const loginFormConfig: FormConfig[] = [
  {
    key: 'email',
    name: i18next.t('signedOut.email'),
    required: true,
    type: 'text',
    pattern: { value: /^\S+@\S+$/, message: i18next.t('form.emailIncorrectFormat') },
  },
  {
    key: 'password',
    name: i18next.t('signedOut.password'),
    required: true,
    type: 'text',
    minLength: {
      value: 8,
      message: i18next.t('form.minLength', { name: i18next.t('signedOut.password'), length: 8 }),
    },
  },
];

export const Login = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  const onLoginPress = (values: { email: string; password: string }) => {
    // TODO: login
    // if success
    navigate(Route.SignedInTabs);
  };

  return (
    <Container>
      <ContentWrapper justifyContent="space-between">
        <VStack space="4">
          <Image source={require('assets/images/start_1.jpg')} w="100%" h="300px" />
          <VStack mx="4" space="6">
            <Text variant="authTitle">{t('signedOut.login.title')}</Text>
            <CustomForm
              scrollEnabled={false}
              showLabels={false}
              formConfig={loginFormConfig}
              renderFooter={(form: RenderFooterType) => (
                <Button onPress={() => onLoginPress(form.getValues())} isDisabled={!form.isValid}>
                  {t('signedOut.login.login')}
                </Button>
              )}
            />
          </VStack>
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
