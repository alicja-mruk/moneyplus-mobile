import React from 'react';


import i18next from 'i18next';
import { Button, Image, Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';

import { RegisterVars } from 'api/types';
import { ContentWrapper } from 'components/ContentWrapper';
import { CustomForm, FormConfig, RenderFooterType } from 'components/CustomForm';

import { useRegister } from '../hooks/useRegister';

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
  const { register } = useRegister();

  const onRegisterPress = async (args: RegisterVars) => {
    await register(args);
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
