import React from 'react';

import { HStack, Text } from 'native-base';

type Props = {
  label: string;
  value: string;
};

export const UserInfo = ({ label, value }: Props) => (
  <HStack space="4">
    <Text variant="subtitle">{label}:</Text>
    <Text variant="body">{value}</Text>
  </HStack>
);
