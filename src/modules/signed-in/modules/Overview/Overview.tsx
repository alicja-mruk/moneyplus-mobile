import React from 'react';


import { Text } from 'native-base';
import { useTranslation } from 'react-i18next';

import { ContentWrapper } from 'components';

export const Overview = () => {
  const { t } = useTranslation();

  return (
    <ContentWrapper>
      <Text variant="h1">{t('signedIn.overview.title')}</Text>
    </ContentWrapper>
  );
};
