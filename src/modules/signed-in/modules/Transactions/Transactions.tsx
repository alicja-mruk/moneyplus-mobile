import React from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  Box,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HStack,
  Pressable,
  SectionList,
  Select,
  Text,
  VStack,
} from 'native-base';

import NoData from 'components/NoData';
import { useTranslationPrefix } from 'config/i18n';
import { ExpenseRange } from 'hooks/useSelectExpenseRange';
import { Expense } from 'models/Expense';
import { Route } from 'navigation/Route';

import { SectionHeader } from './components/SectionHeader';
import { TransactionListItem } from './components/TransactionListItem';
import { useTransactionsUseCase } from './useTransactionsUseCase';

export const Transactions = () => {
  const t = useTranslationPrefix('signedIn.transactions');
  const { data, sectionData, range, onRangeChange, rangeLabels } = useTransactionsUseCase();

  const { navigate } = useNavigation();

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
    const _date = new Date(date);

    return (
      <SectionHeader date={_date} totalSectionExpense={totalSectionExpense} range={range.value} />
    );
  };

  return (
    <VStack py="4" flex="1" safeArea bg="white">
      <HStack justifyContent="space-between" alignItems="center" mr="2">
        <Text variant="h1" px="4">
          {t('title')}
        </Text>
        <Box maxW="200">
          <Select
            color="gray.500"
            rounded="8"
            dropdownOpenIcon={<ChevronUpIcon pr="12" />}
            dropdownCloseIcon={<ChevronDownIcon pr="12" />}
            selectedValue={range.value}
            minWidth="180"
            accessibilityLabel={t('a11y.select')}
            placeholder={t('chooseTimeframe')}
            _selectedItem={{
              startIcon: <CheckIcon size="5" />,
            }}
            onValueChange={value => onRangeChange(value as ExpenseRange)}>
            {rangeLabels.map((item, index) => (
              <Select.Item {...item} key={index} color="gray.400" />
            ))}
          </Select>
        </Box>
      </HStack>
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
