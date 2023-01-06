import { useEffect, useState } from 'react';

import { useLoadFonts } from './useLoadFonts';

type IUseInit = {
  isReady: boolean;
};

export const useInit = (): IUseInit => {
  const fontsReady = useLoadFonts();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(fontsReady);
  }, [fontsReady]);

  return {
    isReady,
  };
};
