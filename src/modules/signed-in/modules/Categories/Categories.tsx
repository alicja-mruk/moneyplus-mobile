import React from 'react';
import { useWindowDimensions } from 'react-native';

import { Center, Text, VStack } from 'native-base';
import { DonutChart } from 'react-native-circular-chart';

import { ContentWrapper } from 'components';
import { useBottomSheetCustom } from 'hooks';
import { useGetCategories } from 'hooks/api';
import { Category } from 'models/Category';

import { AddRecordBottomSheet, CategoryItem } from './components';

export const Categories = () => {
  const { height, width } = useWindowDimensions();
  const bottomSheet = useBottomSheetCustom<Category>();

  const { data: categories } = useGetCategories();

  // const data = mockedCategories.map(item => {
  //   return { value: item.amount, color: item.color, name: item.categoryName };
  // });

  // TODO: remove mocks
  const expenses = '2000 zł';
  const income = '14 000 zł';

  const onAddExpense = (category: Category) => {
    bottomSheet.open(category);
  };

  return (
    <ContentWrapper>
      <Center flex="1" mb="7">
        {/* <DonutChart
          data={data}
          strokeWidth={10}
          radius={105}
          containerWidth={width}
          containerHeight={130 * 2}
          type="round"
          startAngle={0}
          endAngle={360}
          animationType="slide"
          info={
            <VStack alignItems="center" justifyContent="center">
              <Text variant="label">Expenses</Text>
              <Text color="red.500" variant="h2">
                {expenses}
              </Text>
              <Text color="green.500" variant="body">
                {income}
              </Text>
            </VStack>
          }
        /> */}

        {categories?.map((item, index) => (
          <CategoryItem
            key={index}
            {...item}
            onPress={() => onAddExpense(item)}
            position="absolute"
            {...getAbsoluteProps(index, width, height)}
          />
        ))}
      </Center>

      <AddRecordBottomSheet category={bottomSheet.data} ref={bottomSheet.ref} />
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
