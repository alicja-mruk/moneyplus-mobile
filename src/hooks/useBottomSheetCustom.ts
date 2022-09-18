import { RefObject, useCallback, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useFocusEffect } from '@react-navigation/native';

export type BottomSheetCustom<T> = {
  ref: RefObject<BottomSheetModalMethods>;
  open: (newData?: T) => void;
  close: () => void;
  data: T | undefined;
};
export const useBottomSheetCustom = <T>(): BottomSheetCustom<T> => {
  const ref = useRef<BottomSheetModal>(null);
  const [data, setData] = useState<T>();

  useFocusEffect(
    useCallback(() => {
      return () => ref.current?.dismiss();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const open = useCallback((newData?: T) => {
    newData && setData(newData);
    ref.current?.present();
  }, []);

  const close = useCallback(() => {
    ref.current?.close();
    if (data) {
      setData(undefined);
    }
  }, [data]);

  return {
    ref,
    open,
    close,
    data,
  };
};
