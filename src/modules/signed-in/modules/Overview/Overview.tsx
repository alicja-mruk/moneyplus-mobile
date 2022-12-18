import React, { useMemo, useState } from 'react';

import { ArrowDownIcon, Button, Text } from 'native-base';

import { ContentWrapper } from 'components';
import { useTranslationPrefix } from 'config/i18n';
import { useCategoriesWithExpense } from 'hooks/api';

import { OverviewItem } from './components/OverviewItem';

export const Overview = () => {
  const t = useTranslationPrefix('signedIn.overview');

  const { categoriesWithExpense } = useCategoriesWithExpense();

  const [showAll, setShowAll] = useState(false);

  const data = useMemo(() => {
    const sortedByPercentage = categoriesWithExpense.sort(
      (a, b) => b.totalExpensePercentage - a.totalExpensePercentage,
    );

    return showAll ? sortedByPercentage : sortedByPercentage.slice(0, 3);
  }, [categoriesWithExpense, showAll]);

  return (
    <ContentWrapper>
      <Text variant="h1">{t('title')}</Text>
      {data.map(item => (
        <OverviewItem item={item} key={item.id} />
      ))}
      {!showAll && (
        <Button variant="ghost" endIcon={<ArrowDownIcon />} onPress={() => setShowAll(true)}>
          {t('showMore')}
        </Button>
      )}
    </ContentWrapper>
  );
};
