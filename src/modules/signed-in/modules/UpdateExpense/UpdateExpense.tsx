import React, { useMemo } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import i18next from 'i18next';
import { Button, Circle, HStack, IconButton, Text, VStack } from 'native-base';

import { CustomForm, FormConfig, RenderFooterType } from 'components/CustomForm';
import { useTranslationPrefix } from 'config/i18n';
import { getIconByName } from 'utils/getIconByName';

import { UpdateExpenseParamProp } from '../Categories/CategoriesStack';

import { UpdateExpenseForm, useUpdateExpenseUseCase } from './hooks/useUpdateExpenseUseCase';

export const formConfig: FormConfig[] = [
  {
    key: 'date',
    name: i18next.t('updateExpense.form.date'),
    required: false,
    type: 'date',
  },
  {
    key: 'note',
    name: i18next.t('updateExpense.form.note'),
    required: false,
    type: 'text',
  },
  {
    key: 'expense',
    name: i18next.t('updateExpense.form.expense'),
    required: true,
    type: 'number',
  },
];

export const UpdateExpense = () => {
  const { params } = useRoute<UpdateExpenseParamProp>();
  const { goBack } = useNavigation();
  const t = useTranslationPrefix('updateExpense');
  const { updateExpense } = useUpdateExpenseUseCase();

  const title = useMemo(() => (params?.expense ? t('update') : t('create')), [params?.expense, t]);

  const onSubmitPress = async (form: UpdateExpenseForm) => {
    await updateExpense({ form, category: params.category, expense: params?.expense });
  };

  return (
    <VStack px="4" flex="1" safeArea bg="white">
      <HStack alignItems="center" justifyContent="space-between">
        <Text variant="h3">{title}</Text>
        <IconButton onPress={goBack} size="12" alignSelf="flex-end">
          <MaterialCommunityIcons name="close" size={16} />
        </IconButton>
      </HStack>

      <HStack alignItems="center" space="4" mt="4">
        <Circle size="12" bg={params?.category?.color}>
          {getIconByName(params?.category?.iconName)}
        </Circle>
        <Text>{params?.category?.categoryName}</Text>
      </HStack>

      <CustomForm
        mt="12"
        initialValue={{
          expense: `${params?.expense?.value ? params?.expense?.value : ''}`,
          note: `${params?.expense?.name ? params?.expense?.name : ''}`,
          date: `${params?.expense?.creationDate ? params?.expense?.creationDate : ''}`,
        }}
        scrollEnabled={false}
        showLabels={false}
        formConfig={formConfig}
        renderFooter={(form: RenderFooterType) => (
          <Button
            onPress={() => onSubmitPress(form.getValues() as UpdateExpenseForm)}
            isDisabled={!form.isValid}>
            {title}
          </Button>
        )}
      />
    </VStack>
  );
};
