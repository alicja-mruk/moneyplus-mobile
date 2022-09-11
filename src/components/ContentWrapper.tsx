import React from 'react';

import { VStack } from 'native-base';
import { InterfaceVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';

type Props = {
  children: React.ReactNode;
} & InterfaceVStackProps;

export const ContentWrapper = ({ children, ...rest }: Props) => {
  return (
    <VStack p="4" flex="1" {...rest} safeArea bg="white">
      {children}
    </VStack>
  );
};
