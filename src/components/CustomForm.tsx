import React from 'react';

import { Box, FormControl, ScrollView } from 'native-base';
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

export type TextInputTypes = 'text' | 'number';

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
};

export const CustomForm = ({
  formConfig,
  renderFooter,
  initialValue,
  children,
  showLabels = true,
  verticalSpaceFooter = '12',
  scrollEnabled = true,
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
      <ScrollView scrollEnabled={scrollEnabled}>
        {formConfig.map(item => (
          <Box h="16">
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
