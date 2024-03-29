import { useEffect, useState } from 'react';

import * as Font from 'expo-font';

const fonts = {
  'Inter-Black': require('assets/fonts/Inter-Black.ttf'),
  'Inter-Bold': require('assets/fonts/Inter-Bold.ttf'),
  'Inter-ExtraBold': require('assets/fonts/Inter-ExtraBold.ttf'),
  'Inter-ExtraLight': require('assets/fonts/Inter-ExtraLight.ttf'),
  'Inter-Light': require('assets/fonts/Inter-Light.ttf'),
  'Inter-Medium': require('assets/fonts/Inter-Medium.ttf'),
  'Inter-Regular': require('assets/fonts/Inter-Regular.ttf'),
  'Inter-SemiBold': require('assets/fonts/Inter-SemiBold.ttf'),
  'Inter-Thin': require('assets/fonts/Inter-Thin.ttf'),
};

export const useLoadFonts = (): boolean => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync(fonts);
      setReady(true);
    };
    loadFonts();
  }, []);

  return ready;
};
