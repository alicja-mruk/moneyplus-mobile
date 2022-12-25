import { RefObject, useCallback, useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useFocusEffect } from '@react-navigation/native';

export type BottomSheetCustom = {
  ref: RefObject<BottomSheetModalMethods>;
  open: () => void;
  close: () => void;
};

export const useBottomSheet = (): BottomSheetCustom => {
  const ref = useRef<BottomSheetModal>(null);

  useFocusEffect(
    useCallback(() => {
      return () => ref.current?.dismiss();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const open = useCallback(() => {
    ref.current?.present();
  }, []);

  const close = useCallback(() => {
    ref.current?.close();
  }, []);

  return {
    ref,
    open,
    close,
  };
};
