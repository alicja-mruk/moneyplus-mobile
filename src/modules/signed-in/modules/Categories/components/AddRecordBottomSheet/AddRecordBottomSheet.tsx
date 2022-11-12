import React, { forwardRef, useRef } from 'react';

import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Button, Divider, HStack, Input, Spacer, Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';

import { BottomSheetWrapper } from 'components';
import { Category } from 'models';

import { Keyboard } from '../Keyboard';

import { ActionButtonsPanel } from './ActionButtonsPanel';
import { DateFooter } from './Footer';
import { Header } from './Header';
import { NotesModal, NotesModalHandle } from './NotesModal';
import { PickDateModal, PickDateModalHandle } from './PickDateModal';
import { useAddRecord } from './useAddRecord';

type Props = {
  category?: Category;
};

export const AddRecordBottomSheet = forwardRef<BottomSheetModalMethods, Props>(
  ({ category }, ref) => {
    const { t } = useTranslation();

    const noteModalRef = useRef<NotesModalHandle>();
    const pickDateModalRef = useRef<PickDateModalHandle>();

    const {
      expense,
      note,
      setNote,
      expenseDate,
      setExpenseDate,
      onRemoveLastCharacter,
      onAddExpense,
      onClose,
      onKeyboardPress,
    } = useAddRecord(category);

    return (
      <BottomSheetWrapper snapPoints={[600]} ref={ref} onClose={onClose}>
        <VStack space="4">
          <Header color={category?.color} title={category?.categoryName} />
          <VStack alignItems="center" justifyContent="center">
            <Text color={category?.color} variant="input">
              {t('signedIn.categories.bottomSheet.expense')}
            </Text>
            <Input
              color={category?.color}
              caretHidden
              showSoftInputOnFocus={false}
              keyboardType="numeric"
              textAlign="center"
              value={expense}
              variant="unstyled"
              placeholder="0"
              fontSize="2xl"
            />
            <Divider bg="gray.200" />
            <Button variant="ghost" onPress={() => noteModalRef.current?.openModal(note)}>
              <Text variant="body">
                {note?.length === 0 ? t('signedIn.categories.bottomSheet.notes') : note}
              </Text>
            </Button>
            <Divider bg="gray.200" />
            <HStack>
              <Spacer w="20" />
              <Keyboard onKeyboardPress={onKeyboardPress} />
              <ActionButtonsPanel
                onRemoveLastCharacter={onRemoveLastCharacter}
                openPickDateModal={() => pickDateModalRef?.current?.openModal(expenseDate)}
                isAddExpenseButtonDisabled={expense === '0'}
                categoryColor={category?.color}
                onAddExpense={onAddExpense}
              />
            </HStack>
            <DateFooter date={expenseDate} />
          </VStack>
        </VStack>
        <NotesModal ref={noteModalRef} setNote={setNote} />
        <PickDateModal ref={pickDateModalRef} setExpenseDate={setExpenseDate} />
      </BottomSheetWrapper>
    );
  },
);
