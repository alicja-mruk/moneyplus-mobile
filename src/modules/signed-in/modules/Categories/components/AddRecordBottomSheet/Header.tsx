import React from 'react';

import { Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';

type Props = {
  color?: string;
  title?: string;
};
export const Header = ({ color, title }: Props) => {
  const { t } = useTranslation();

  return (
    <VStack p="2" bg={color} alignItems="center" justifyContent="center" space="1">
      <Text variant="input" color="white">
        {t('signedIn.categories.bottomSheet.title')}
      </Text>
      <Text variant="h2" color="white">
        {title}
      </Text>
    </VStack>
  );
};
