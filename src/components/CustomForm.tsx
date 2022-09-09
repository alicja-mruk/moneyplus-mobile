import React from 'react';

import { Box, FormControl, ScrollView, VStack } from 'native-base';
import { Control, Controller, useForm, UseFormGetValues, UseFormReset } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BaseInput } from './BaseInput';

export type TextInputTypes = 'text' | 'number';

type BaseValueInput = {
  key: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  pattern?: { value: RegExp; message: string };
  validate?: boolean;
  // eslint-disable-next-line no-undef
  InputLeftElement?: JSX.Element;
};

type SingleValueInput = {
  type: TextInputTypes;
} & BaseValueInput;

export type FormConfig = SingleValueInput;

export type RenderFooterType = {
  isValid: boolean;
  reset: UseFormReset<Record<string, any>>;
  getValues: UseFormGetValues<Record<string, any>>;
  isDirty: boolean;
  control: Control<Record<string, any>, any>;
};

type Props = {
  formConfig: FormConfig[];
  showClearButton?: boolean;
  renderFooter: (form: RenderFooterType) => React.ReactNode;
  initialValue?: Record<string, string | string[]>;
  children?: React.ReactNode;
  showLabels?: boolean;
  verticalSpaceFooter?: string;
};

export const CustomForm = ({
  formConfig,
  renderFooter,
  initialValue,
  children,
  showLabels = true,
  verticalSpaceFooter = '12',
}: Props) => {
  const { t } = useTranslation();

  const {
    reset,
    control,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<Record<string, any>>({ mode: 'onChange', defaultValues: initialValue || {} });

  return (
    <>
      <ScrollView>
        <VStack space="6">
          {formConfig.map(item => (
            <FormControl key={item.key} isInvalid={item.key in errors}>
              <Controller
                name={item.key}
                rules={{
                  required: item?.required ? t('form.required') : false,
                  pattern: item?.pattern ?? undefined,
                  validate: item?.validate ?? undefined,
                }}
                control={control}
                render={({ field }) => (
                  <>
                    {showLabels && <FormControl.Label>{item.name}</FormControl.Label>}
                    {
                      {
                        text: (
                          <BaseInput
                            InputLeftElement={item?.InputLeftElement}
                            value={field.value}
                            onBlur={field.onBlur}
                            onChangeText={field.onChange}
                            isDisabled={item.disabled}
                          />
                        ),
                        number: (
                          <BaseInput
                            InputLeftElement={item?.InputLeftElement}
                            keyboardType="numeric"
                            value={field.value}
                            onBlur={field.onBlur}
                            onChangeText={field.onChange}
                          />
                        ),
                      }[item.type]
                    }
                  </>
                )}
              />
              <FormControl.ErrorMessage>{errors[item.key]?.message}</FormControl.ErrorMessage>
            </FormControl>
          ))}
        </VStack>
        {children}
      </ScrollView>

      <Box bg="white" py={verticalSpaceFooter}>
        {renderFooter({ isValid, reset, getValues, isDirty, control })}
      </Box>
    </>
  );
};
