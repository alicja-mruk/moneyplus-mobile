import 'config/i18n';
import React, { useCallback } from 'react';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider, View } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { queryClient } from 'api';
import { CustomToastProvider } from 'components/CustomToast';
import { theme } from 'config/theme';
import { AuthProvider, AxiosProvider } from 'contexts';
import { useLoadFonts } from 'hooks';
import { RootStack } from 'navigation/RootStack';

export const App = () => {
  const ready = useLoadFonts();

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <View flex="1" onLayout={onLayoutRootView}>
                <AuthProvider>
                  <AxiosProvider>
                    <RootStack />
                  </AxiosProvider>
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
