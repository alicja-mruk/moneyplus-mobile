import React from 'react';
import { useWindowDimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Center, Text, VStack } from 'native-base';
import { DonutChart } from 'react-native-circular-chart';

import { ContentWrapper } from 'components/ContentWrapper';
import { Route } from 'navigation/Route';

import { CategoryItem } from './components/CategoryItem';
import { useCategoriesUseCase } from './hooks/useCategoriesUseCase';
import { getAbsoluteProps } from './utils';

const CONTAINER_HEIGHT = 130;

export const Categories = () => {
  const { height, width } = useWindowDimensions();
  const { navigate } = useNavigation();

  const { chartData, expenseValue, categoriesWithExpense } = useCategoriesUseCase();

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
