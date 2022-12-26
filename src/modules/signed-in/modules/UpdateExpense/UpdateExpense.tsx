import React from 'react';

import { useRoute } from '@react-navigation/native';
import { Button, VStack } from 'native-base';

import { CustomForm, RenderFooterType } from 'components/CustomForm';

import { UpdateExpenseParamProp } from '../Categories/CategoriesStack';

import { CategoryIcon } from './components/CategoryItem';
import { UpdateExpenseHeader } from './components/UpdateExpenseHeader';
import { UpdateExpenseVars, useUpdateExpenseUseCase } from './hooks/useUpdateExpenseUseCase';

export const UpdateExpense = () => {
  const { params } = useRoute<UpdateExpenseParamProp>();

  const { updateExpense, initValue, formConfig, title, loading } = useUpdateExpenseUseCase(
    params.expense,
  );

  const onSubmitPress = async (form: UpdateExpenseVars) => {
    await updateExpense({ form, category: params.category, expense: params?.expense });
  };

  return (
    <VStack px="4" flex="1" safeArea bg="white">
      <UpdateExpenseHeader title={title} />
      <CategoryIcon category={params.category} />
      <CustomForm
        mt="6"
        initialValue={initValue}
        scrollEnabled={false}
        formConfig={formConfig}
        renderFooter={(form: RenderFooterType) => (
          <Button
            onPress={() => onSubmitPress(form.getValues() as UpdateExpenseVars)}
            isDisabled={!form.isValid}
            isLoading={loading}>
            {title}
          </Button>
        )}
      />
    </VStack>
  );
};
