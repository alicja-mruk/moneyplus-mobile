import 'config/i18n';
import React, { useCallback } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider, View } from 'native-base';

import { theme } from 'config/theme';
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
      <NavigationContainer>
        <View flex="1" onLayout={onLayoutRootView}>
          <RootStack />
        </View>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
