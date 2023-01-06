import React from 'react';
import { useWindowDimensions } from 'react-native';

import { ArrowDownIcon, Box, Button, ScrollView, Text, VStack } from 'native-base';
import { PieChart } from 'react-native-chart-kit';

import { ContentWrapper } from 'components/ContentWrapper';
import NoData from 'components/NoData';
import { useTranslationPrefix } from 'config/i18n';

import { OverviewItem } from './components/OverviewItem';
import { useOverviewUseCase } from './hooks/useOverviewUseCase';

const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
};

export const Overview = () => {
  const t = useTranslationPrefix('signedIn.overview');
  const { width } = useWindowDimensions();

  const { chartData, data, showAll, setShowAll, isEmpty } = useOverviewUseCase();

  return (
    <ContentWrapper>
      <Text variant="h1">{t('title')}</Text>

      {isEmpty ? (
        <VStack flex="1" justifyContent="center" alignItems="center">
          <NoData />
        </VStack>
      ) : (
        <ScrollView bg="white" showsVerticalScrollIndicator={false} flexGrow="1">
          <PieChart
            data={chartData}
            width={width}
            height={200}
            chartConfig={chartConfig}
            accessor="totalExpensePercentage"
            backgroundColor="transparent"
            paddingLeft="-10"
            absolute
          />
          <Box mt="6">
            {data.map(item => (
              <OverviewItem item={item} key={item.id} />
            ))}
          </Box>
          {!showAll && (
            <Button variant="ghost" endIcon={<ArrowDownIcon />} onPress={() => setShowAll(true)}>
              {t('showMore')}
            </Button>
          )}
        </ScrollView>
      )}
    </ContentWrapper>
  );
};
