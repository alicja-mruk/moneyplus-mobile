import React from 'react';

import { Input } from 'native-base';
import { InterfaceInputProps } from 'native-base/lib/typescript/components/primitives/Input/types';

export const BaseInput = (props: InterfaceInputProps) => (
  <Input {...props} variant="underlined" fontSize="sm" outlineColor="tertiary.100" />
);
