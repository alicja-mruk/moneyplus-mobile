import { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { useLoadTokens } from 'modules/signed-out/hooks/useLoadTokens';
import { Route } from 'navigation/Route';

type IUSeSplashUseCase = {
  status: 'loading' | 'success' | 'error';
};

export const useSplashUseCase = (): IUSeSplashUseCase => {
  const navigation = useNavigation();
  const { loadJWT, status } = useLoadTokens();

  useEffect(() => {
    loadJWT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === 'success') {
      navigation.reset({
        index: 0,
        routes: [{ name: Route.SignedInTabs }],
      });
      return;
    }
    if (status === 'error') navigation.navigate(Route.SignedOutStack);
  }, [navigation, status]);

  return {
    status,
  };
};
