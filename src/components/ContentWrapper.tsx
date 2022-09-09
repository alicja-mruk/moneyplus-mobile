import React from 'react';

import { ScrollView, VStack } from 'native-base';
import { InterfaceVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
} & InterfaceVStackProps;

export const ContentWrapper = ({ children, scrollable = true, ...rest }: Props) => {
  return (
    <VStack p="4" flex="1" {...rest}>
      {children}
      {/* <ScrollView scrollEnabled={scrollable}>{children}</ScrollView> */}
    </VStack>
  );
};
