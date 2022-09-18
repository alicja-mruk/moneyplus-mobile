import React, { forwardRef } from 'react';

import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Flex, Pressable } from 'native-base';

const MAX_HEIGHT = 400;
const DEFAULT_SNAP_POINTS = [MAX_HEIGHT];

interface Props {
  snapPoints?: string[] | number[];
  onClose?: () => void;
  children?: React.ReactNode;
}

export const BottomSheetWrapper = forwardRef<BottomSheetModalMethods, Props>(
  ({ snapPoints = DEFAULT_SNAP_POINTS, onClose, children }, ref) => {
    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        stackBehavior="push"
        backdropComponent={backdropProps => (
          <Pressable position="absolute" w="100%" h="100%" onPress={onClose}>
            <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} />
          </Pressable>
        )}
        handleComponent={null}>
        <Flex flex="1" maxH={MAX_HEIGHT}>
          {children}
        </Flex>
      </BottomSheetModal>
    );
  },
);
