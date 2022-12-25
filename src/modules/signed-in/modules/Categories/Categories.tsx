import React, { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Center, Text, VStack } from 'native-base';
import { DonutChart } from 'react-native-circular-chart';

import { ContentWrapper } from 'components/ContentWrapper';
import { Constants } from 'config/constants';
import { colorPalette } from 'config/theme/foundations/colorPalette';
import { useCategoriesWithExpense } from 'hooks/api/categories/useCategoriesWithExpense';
import { Route } from 'navigation/Route';

import { CategoryItem } from './components/CategoryItem';
import { getAbsoluteProps } from './utils';

// if every value is 0 it causes crash
const noExpensesChartData = [
  { value: 250, color: colorPalette.gray[200], name: '' },
  { value: 250, color: colorPalette.gray[200], name: '' },
];

const CONTAINER_HEIGHT = 130;

export const Categories = () => {
  const { height, width } = useWindowDimensions();

  const { categoriesWithExpense, totalExpenses } = useCategoriesWithExpense();

  const { navigate } = useNavigation();

  const chartData = useMemo(() => {
    if (categoriesWithExpense.length > 0) {
      if (categoriesWithExpense.some(category => category.totalExpense > 0)) {
        return categoriesWithExpense.map(category => {
          return {
            value: category.totalExpense,
            color: category.color,
            name: category.categoryName,
          };
        });
      }
    }

    return noExpensesChartData;
  }, [categoriesWithExpense]);

  const expenseValue = useMemo(() => {
    const trimmedZeros = totalExpenses.toString().replace(/^0+/, '');
    return `${trimmedZeros} ${Constants.CURRENCY}`;
  }, [totalExpenses]);

  return (
    <ContentWrapper>
      <Center flex="1" mb="7">
        <DonutChart
          data={chartData}
          strokeWidth={10}
          radius={105}
          containerWidth={width}
          containerHeight={CONTAINER_HEIGHT * 2}
          type="round"
          startAngle={0}
          endAngle={360}
          animationType="slide"
          info={
            <VStack alignItems="center" justifyContent="center">
              <Text variant="label">Expenses</Text>
              <Text color="red.500" variant="h2">
                {expenseValue}
              </Text>
            </VStack>
          }
        />
        {categoriesWithExpense?.map((item, index) => (
          <CategoryItem
            key={index}
            {...item}
            onPress={() => navigate(Route.UpdateExpense, { category: item })}
            position="absolute"
            {...getAbsoluteProps(index, width, height)}
          />
        ))}
      </Center>
    </ContentWrapper>
  );
};
