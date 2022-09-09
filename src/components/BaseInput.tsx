import React from 'react';

import { Input } from 'native-base';
import { IInputComponentType } from 'native-base/lib/typescript/components/primitives/Input/types';

type Props = {
  value: string | undefined;
  onChangeText: (value: string) => void;
} & IInputComponentType;

export const BaseInput = ({ value, onChangeText, ...rest }: Props) => (
  <Input
    value={value}
    onChangeText={onChangeText}
    {...rest}
    variant="underlined"
    fontSize="sm"
    outlineColor="tertiary.100"
  />
);
