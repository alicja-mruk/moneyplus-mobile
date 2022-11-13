import React, { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

import { Center, Text, VStack } from 'native-base';
import { DonutChart } from 'react-native-circular-chart';

import { ContentWrapper } from 'components';
import { Constants } from 'config/constants';
import { colorPalette } from 'config/theme/foundations';
import { useBottomSheetCustom } from 'hooks';
import { useCategoriesWithExpense } from 'hooks/api';
import { Category } from 'models/Category';

import { AddRecordBottomSheet, CategoryItem } from './components';

// if every value is 0 it causes crash
const noExpensesChartData = [
  { value: 250, color: colorPalette.gray[200], name: '' },
  { value: 250, color: colorPalette.gray[200], name: '' },
];

const CONTAINER_HEIGHT = 130;

export const Categories = () => {
  const { height, width } = useWindowDimensions();
  const bottomSheet = useBottomSheetCustom<Category>();

  const { categoriesWithExpense, totalExpenses } = useCategoriesWithExpense();

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

  // TODO: remove mocks
  const income = '14 000 zł';

  const onAddExpense = (category: Category) => {
    bottomSheet.open(category);
  };

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
              <Text color="green.500" variant="body">
                {income}
              </Text>
            </VStack>
          }
        />
        {categoriesWithExpense?.map((item, index) => (
          <CategoryItem
            key={index}
            {...item}
            onPress={() => onAddExpense(item)}
            position="absolute"
            {...getAbsoluteProps(index, width, height)}
          />
        ))}
      </Center>

      <AddRecordBottomSheet
        category={bottomSheet.data as Category}
        ref={bottomSheet.ref}
        onAddExpenseCallback={bottomSheet.close}
      />
    </ContentWrapper>
  );
};

const getAbsoluteProps = (index: number, width: number, height: number) => {
  const itemsInRow = 4;
  const heightSpace = height / itemsInRow - 24;
  const widthSpace = width / itemsInRow;

  if (index < itemsInRow) {
    return {
      top: 0,
      left: index * widthSpace,
    };
  }

  if (index >= itemsInRow && index < 2 * itemsInRow) {
    return {
      top: index < itemsInRow + itemsInRow / 2 ? heightSpace : 2 * heightSpace,
      left: index % 2 === 0 ? 0 : 3 * widthSpace,
    };
  }

  return {
    top: 3 * heightSpace,
    left:
      index % 3 === 0
        ? widthSpace
        : index === 2 * itemsInRow
        ? 0
        : index % 2 === 0
        ? 2 * widthSpace
        : 3 * widthSpace,
  };
};
