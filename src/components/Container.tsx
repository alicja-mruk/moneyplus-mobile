import React from 'react';

import { VStack } from 'native-base';
import { InterfaceVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';

type Props = {
  children: React.ReactNode;
} & InterfaceVStackProps;

export const Container = ({ children, ...rest }: Props) => {
  return (
    <VStack safeArea flex="1" bg="white" {...rest}>
      {children}
    </VStack>
  );
};
