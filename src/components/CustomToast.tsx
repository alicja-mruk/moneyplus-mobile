import React, { useMemo } from 'react';


import { Box, CheckIcon, HStack, Text, useTheme, VStack, WarningIcon } from 'native-base';
import { useTranslation } from 'react-i18next';
import Toast, { BaseToastProps } from 'react-native-toast-message';

type Props = {
  title: string;
  message?: string;
  icon: Element;
  bg: string;
};

export const CustomToast = {
  success: (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
    });
  },
  error: (message?: string) => {
    Toast.show({
      type: 'error',
      text1: message,
    });
  },
};

const ErrorIcon = () => {
  const { colors } = useTheme();

  return (
    <Box bg="warning.200" rounded="full" p="1">
      <WarningIcon color={colors.white} />
    </Box>
  );
};

const SuccessIcon = () => {
  const { colors } = useTheme();

  return (
    <Box bg="green.500" rounded="full" p="1">
      <CheckIcon color={colors.white} />
    </Box>
  );
};

const StyledToast = ({ title, message, icon, bg }: Props) => {
  return (
    <VStack bg={bg} p="4" w="90%" rounded="4">
      <HStack alignItems="center" space="2">
        {icon}
        <Text variant="headlineSmall" color="white">
          {title}
        </Text>
      </HStack>
      <Text pl="8" color="white">
        {message}
      </Text>
    </VStack>
  );
};

export const CustomToastProvider = () => {
  const { t } = useTranslation();

  const toastConfig = useMemo(
    () => ({
      success: ({ text1 }: BaseToastProps) => (
        <StyledToast
          title={t('global.success')}
          message={text1 || t('global.error')}
          icon={<SuccessIcon />}
          bg="green.700"
        />
      ),
      error: ({ text1 }: BaseToastProps) => (
        <StyledToast title={t('global.error')} message={text1} icon={<ErrorIcon />} bg="red.600" />
      ),
    }),
    [t],
  );

  return <Toast config={toastConfig} />;
};
