import React from 'react';

import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import { Button, Image, Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';

import { RegisterVars } from 'api';
import { ContentWrapper, CustomForm, CustomToast } from 'components';
import { FormConfig, RenderFooterType } from 'components/CustomForm';
import { useAuthContext } from 'contexts';
import { RegisterErrorReason } from 'contexts/AuthContext';
import { Route } from 'navigation';

import { loginFormConfig } from './Login';

const formConfig: FormConfig[] = [
  ...loginFormConfig,
  {
    key: 'firstName',
    name: i18next.t('signedOut.firstName'),
    required: true,
    type: 'text',
  },
  {
    key: 'lastName',
    name: i18next.t('signedOut.lastName'),
    required: true,
    type: 'text',
  },
  {
    key: 'age',
    name: i18next.t('signedOut.age'),
    required: true,
    type: 'number',
  },
];

export const Register = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { register } = useAuthContext();

  const onRegisterPress = async ({ email, password, firstName, lastName, age }: RegisterVars) => {
    try {
      const result = await register({ email, password, firstName, lastName, age });
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

  return (
    <ContentWrapper justifyContent="space-between" flex="1">
      <VStack space="4">
        <Image source={require('assets/images/start_3.jpg')} w="100%" h="300px" alt="" />
        <VStack mx="4" space="6">
          <Text variant="authTitle">{t('signedOut.register.title')}</Text>
          <CustomForm
            showLabels={false}
            formConfig={formConfig}
            renderFooter={(form: RenderFooterType) => (
              <Button
                mt="6"
                onPress={() => onRegisterPress(form.getValues() as RegisterVars)}
                isDisabled={!form.isValid}>
                {t('signedOut.register.register')}
              </Button>
            )}
          />
        </VStack>
      </VStack>
    </ContentWrapper>
  );
};
