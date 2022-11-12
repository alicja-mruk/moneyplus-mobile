import React, { useMemo } from 'react';

import _ from 'lodash';
import { SectionList, Text } from 'native-base';
import { useTranslation } from 'react-i18next';

import { ContentWrapper } from 'components';
import { useGetExpenses } from 'hooks/api';
import { Expense } from 'models';

export const Transactions = () => {
  const { t } = useTranslation();
  const { data } = useGetExpenses();

  // const sectionData = useMemo(() => {
  //   const grouped = data?.reduce((prev: Expense, curr: Expense) => {
  //     const date = new Date(curr.creationDate);
  //     const key = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  //     if (!prev[key]) {
  //       prev[key] = [curr];
  //     } else {
  //       prev[key].push(curr);
  //     }

  //     return prev;
  //   }, []);
  // }, [data]);

  // const DATA = [
  //   {
  //     title: 'Main dishes',
  //     data: ['Pizza', 'Burger', 'Risotto'],
  //   },
  //   {
  //     title: 'Sides',
  //     data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  //   },
  //   {
  //     title: 'Drinks',
  //     data: ['Water', 'Coke', 'Beer'],
  //   },
  //   {
  //     title: 'Desserts',
  //     data: ['Cheese Cake', 'Ice Cream'],
  //   },
  // ];

  // // TODO: specify
  // const renderItem = ({ item }: { item: any }) => {};

  return (
    <ContentWrapper>
      <Text variant="h1">{t('signedIn.transactions.title')}</Text>

      {/* <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { key } }) => <Text>{key}</Text>}
      /> */}
    </ContentWrapper>
  );
};;
