import React from 'react';

import { Text } from 'native-base';

type Props = {
  label: string;
  focused: boolean;
};

export const TabBarLabel = ({ label, focused }: Props) => (
  <Text variant="headline" color={focused ? 'primary.200' : 'primary.100'}>
    {label}
  </Text>
);
