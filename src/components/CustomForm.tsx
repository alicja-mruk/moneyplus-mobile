import React from 'react';

import { Box, FormControl, ScrollView, VStack } from 'native-base';
import { InterfaceScrollViewProps } from 'native-base/lib/typescript/components/basic/ScrollView/types';
import {
  Control,
  Controller,
  useForm,
  UseFormGetValues,
  UseFormReset,
  Validate,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BaseInput } from './BaseInput';
import { DateInput } from './DateInput';

export type TextInputTypes = 'text' | 'number' | 'date';

type BaseValueInput = {
  key: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  pattern?: { value: RegExp; message: string };
  validate?: Validate<any>;
  minLength?: { value: number; message: string };
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
  scrollEnabled?: boolean;
} & InterfaceScrollViewProps;

export const CustomForm = ({
  formConfig,
  renderFooter,
  initialValue,
  children,
  showLabels = true,
  verticalSpaceFooter = '12',
  scrollEnabled = true,
  ...rest
}: Props) => {
  const { t } = useTranslation();

  const {
    reset,
    control,
    setValue,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<Record<string, any>>({ mode: 'onChange', defaultValues: initialValue || {} });

  return (
    <>
      <ScrollView scrollEnabled={scrollEnabled} {...rest}>
        {formConfig.map(item => (
          <Box h="16" key={item.key}>
            <FormControl key={item.key} isInvalid={item.key in errors}>
              <Controller
                name={item.key}
                rules={{
                  required: item?.required ? t('form.required') : false,
                  pattern: item?.pattern ?? undefined,
                  validate: item?.validate ?? undefined,
                  minLength: item?.minLength ?? undefined,
                }}
                control={control}
                render={({ field }) => (
                  <>
                    {showLabels ||
                      (item.showLabel && <FormControl.Label>{item.name}</FormControl.Label>)}
                    {
                      {
                        text: (
                          <BaseInput
                            InputLeftElement={item?.InputLeftElement}
                            value={field.value}
                            onBlur={field.onBlur}
                            onChangeText={field.onChange}
                            isDisabled={item.disabled}
                            placeholder={item.name}
                            secureTextEntry={item?.secureTextEntry}
                          />
                        ),
                        number: (
                          <BaseInput
                            InputLeftElement={item?.InputLeftElement}
                            keyboardType="numeric"
                            value={field.value}
                            onBlur={field.onBlur}
                            onChangeText={field.onChange}
                            placeholder={item.name}
                          />
                        ),
                        date: (
                          <DateInput
                            field={field}
                            onChange={date => {
                              setValue(item.key, date);
                            }}
                          />
                        ),
                      }[item.type]
                    }
                  </>
                )}
              />
              <FormControl.ErrorMessage position="absolute" bottom="-20">
                {errors[item.key]?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </Box>
        ))}
        {children}
      </ScrollView>
      <Box bg="white" py={verticalSpaceFooter}>
        {renderFooter({ isValid, reset, getValues, isDirty, control })}
      </Box>
    </>
  );
};
