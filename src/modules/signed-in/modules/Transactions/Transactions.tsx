import React, { useMemo } from 'react';


import { Box, Circle, Divider, HStack, Pressable, SectionList, Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';

import { Constants } from 'config/constants';
import { useGetExpenses } from 'hooks/api';
import { Expense } from 'models';

import { getIconByName } from '../Categories/components/CategoryItem';

// TODO: fix types
const groupByDate = (expenses: Expense[]) => {
  const groups = expenses.reduce((result, expense) => {
    const date = expense.creationDate.split('T')[0];
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(expense);
    return result;
  }, {});

  return Object.keys(groups).map(date => {
    return {
      date,
      data: groups[date] as Expense[],
    };
  });
};

export const Transactions = () => {
  const { t } = useTranslation();
  const { data } = useGetExpenses();

  const sectionData = useMemo(() => groupByDate(data ?? []), [data]);

  const renderItem = ({ item }: { item: Expense }) => {
    const onPress = () => {};

    return (
      <Pressable onPress={onPress} mx="4">
        {({ isPressed }) => (
          <Box>
            <HStack
              space="4"
              alignItems="center"
              justifyContent="space-between"
              bg={isPressed ? 'secondary.400:alpha.20' : 'transparent'}>
              <HStack space="4" alignItems="center">
                <Circle size="12" bg={item?.category?.color} mt="2">
                  {getIconByName(item?.category?.iconName)}
                </Circle>

                <VStack>
                  <Text variant="body" color={item?.category?.color} noOfLines={1}>
                    {item?.category?.categoryName}
                  </Text>
                  <Text variant="body" color={item?.category?.color} noOfLines={1}>
                    {item?.name}
                  </Text>
                </VStack>
              </HStack>

              <Text variant="body" color="red.500" noOfLines={1}>
                - {item.value} {Constants.CURRENCY}
              </Text>
            </HStack>
            <Divider bg="gray.200" mt="2" />
          </Box>
        )}
      </Pressable>
    );
  };

  const renderSectionHeader = ({ section: { date } }: { section: { date: string } }) => {
    const sectionExpenses = sectionData.find(item => item.date === date)?.data;
    const totalSectionExpense = sectionExpenses?.reduce((acc, expense) => acc + expense.value, 0);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateFormatted = new Date(date);

    return (
      <HStack justifyContent="space-between" alignItems="center" bg="gray.200" p="3">
        <Text variant="bodyBold">{dateFormatted.toLocaleDateString('en-GB', options)}</Text>
        <Text color="warning.200" variant="h3">
          - {totalSectionExpense} {Constants.CURRENCY}
        </Text>
      </HStack>
    );
  };

  return (
    <VStack py="4" flex="1" safeArea bg="white">
      <Text variant="h1" px="4">
        {t('signedIn.transactions.title')}
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
        // TODO: finish
        <Text>No Data</Text>
      )}
    </VStack>
  );
};
