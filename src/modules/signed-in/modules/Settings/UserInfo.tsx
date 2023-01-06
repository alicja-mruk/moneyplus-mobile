import React from 'react';

import { Badge, HStack, Text } from 'native-base';

export type UserInfoProps = {
  label: string;
  value?: string;
};

export const UserInfo = ({ label, value }: UserInfoProps) => {
  if (value)
    return (
      <HStack space="4" alignItems="center">
        <Text variant="subtitle">{label}:</Text>
        <Badge>{value}</Badge>
      </HStack>
    );

  return null;
};
