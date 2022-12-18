import React, { useMemo, useState } from 'react';

import { ArrowDownIcon, Button, Circle, Divider, HStack, Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';

import { ContentWrapper } from 'components';
import { Constants } from 'config/constants';
import { useCategoriesWithExpense } from 'hooks/api';
import { CategoryWithExpense } from 'hooks/api/categories/useCategoriesWithExpense';

import { getIconByName } from '../Categories/components/CategoryItem';

export const Overview = () => {
  const { t } = useTranslation();

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
      <Text variant="h1">{t('signedIn.overview.title')}</Text>
      {data.map(item => (
        <OverviewItem item={item} key={item.id} />
      ))}
      {!showAll && (
        <Button variant="ghost" endIcon={<ArrowDownIcon />} onPress={() => setShowAll(true)}>
          {t('signedIn.overview.showMore')}
        </Button>
      )}
    </ContentWrapper>
  );
};

const OverviewItem = ({ item }: { item: CategoryWithExpense }) => {
  return (
    <>
      <HStack space="4" alignItems="center" justifyContent="space-between" my="1">
        <HStack space="4" alignItems="center">
          <Circle size="12" bg={item.color} mt="2">
            {getIconByName(item?.iconName)}
          </Circle>
          <VStack>
            <Text variant="body" color={item?.color} noOfLines={1}>
              {item?.categoryName}
            </Text>
          </VStack>
        </HStack>
        <VStack alignItems="flex-end">
          <Text variant="body" noOfLines={1}>
            {item.totalExpense} {Constants.CURRENCY}
          </Text>
          <Text>{item.totalExpensePercentage}%</Text>
        </VStack>
      </HStack>
      <Divider bg="gray.200" mt="2" />
    </>
  );
};
