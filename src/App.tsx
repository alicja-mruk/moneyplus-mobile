import 'config/i18n';
import React, { useCallback } from 'react';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider, View } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
    <NativeBaseProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <View flex="1" onLayout={onLayoutRootView}>
              <AxiosProvider>
                <AuthProvider>
                  <RootStack />
                </AuthProvider>
              </AxiosProvider>
            </View>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <CustomToastProvider />
    </NativeBaseProvider>
  );
};
