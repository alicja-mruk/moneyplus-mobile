import React, { useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, SectionList, Text, VStack } from 'native-base';

import NoData from 'components/NoData';
import { useTranslationPrefix } from 'config/i18n';
import { useGetExpenses } from 'hooks/api/expenses/useGetExpenses';
import { Expense } from 'models/Expense';
import { Route } from 'navigation/Route';
import { groupByDate } from 'utils/groupByDate';

import { SectionHeader } from './components/SectionHeader';
import { TransactionListItem } from './components/TransactionListItem';

export const Transactions = () => {
  const t = useTranslationPrefix('signedIn.transactions');
  const { data } = useGetExpenses();
  const { navigate } = useNavigation();
  const sectionData = useMemo(() => groupByDate(data ?? []), [data]);

  const renderItem = ({ item }: { item: Expense }) => (
    <Pressable
      onPress={() => navigate(Route.UpdateExpense, { category: item.category, expense: item })}>
      <TransactionListItem item={item} />
    </Pressable>
  );

  const renderSectionHeader = ({ section: { date } }: { section: { date: string } }) => {
    const sectionExpenses = sectionData.find(item => item.date === date)?.data;
    const totalSectionExpense =
      sectionExpenses?.reduce((acc, expense) => acc + expense.value, 0) ?? 0;
    const dateFormatted = new Date(date);

    return (
      <SectionHeader dateFormatted={dateFormatted} totalSectionExpense={totalSectionExpense} />
    );
  };

  return (
    <VStack py="4" flex="1" safeArea bg="white">
      <Text variant="h1" px="4">
        {t('title')}
      </Text>
      {data && data.length > 1 ? (
        <SectionList
          contentContainerStyle={{ paddingVertical: 16 }}
          stickySectionHeadersEnabled
          showsVerticalScrollIndicator={false}
          bounces={false}
          sections={sectionData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      ) : (
        <NoData />
      )}
    </VStack>
  );
};
