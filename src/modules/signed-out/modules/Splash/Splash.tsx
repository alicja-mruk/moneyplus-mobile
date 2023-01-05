import { Spinner, Text, VStack } from 'native-base';

import { useSplashUseCase } from './hooks/useSplashUseCase';

export const Splash = () => {
  const { status } = useSplashUseCase();

  return (
    <VStack flex="1" justifyContent="center" alignItems="center" bg="white">
      {status === 'loading' ? <Spinner /> : <Text>Welcome!</Text>}
    </VStack>
  );
};
