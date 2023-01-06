import React, { useCallback } from 'react';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider, View } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { queryClient } from 'api/queryClient';
import { CustomToastProvider } from 'components/CustomToast';
import Loading from 'components/Loading';
import { theme } from 'config/theme/theme';
import { AuthProvider } from 'contexts/AuthContext';
import { AxiosProvider } from 'contexts/AxiosContext';
import { useInit } from 'hooks/useInit';
import { RootStack } from 'navigation/RootStack';

export const App = () => {
  const { isReady } = useInit();

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <View flex="1" onLayout={onLayoutRootView}>
                <AuthProvider>
                  <AxiosProvider>{isReady ? <RootStack /> : <Loading />}</AxiosProvider>
                </AuthProvider>
              </View>
            </NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
        <CustomToastProvider />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};
