import React, { forwardRef, useMemo, useState } from 'react';

import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Box, Button, Divider, HStack, IconButton, Input, Spacer, Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';

import { BottomSheetWrapper, CustomModal } from 'components';
import { Constants } from 'config/constants';
import { useModal } from 'hooks';
import { Category } from 'models';

import { Keyboard } from './Keyboard';

const COMMA = ',';

type Props = {
  category?: Category;
};

export const AddExpenseBottomSheet = forwardRef<BottomSheetModalMethods, Props>(
  ({ category }, ref) => {
    const { t } = useTranslation();

    const { modalOpen, closeModal, openModal } = useModal();

    const [{ expense, startState }, setExpense] = useState({ expense: '0', startState: true });
    const [note, setNote] = useState('');

    const onKeyboardPress = (item: string) => {
      const isComma = item === COMMA;

      setExpense(prev => {
        const disableAddCharactersAfterComma = prev.expense.split(COMMA).pop()?.length === 2;

        return {
          startState: startState && item === '0',
          expense: prev.startState
            ? item
            : (prev.expense.includes(COMMA) && isComma) ||
              (prev.expense.includes(COMMA) && disableAddCharactersAfterComma)
            ? prev.expense
            : `${prev.expense}${item}`,
        };
      });
    };

    const _onClose = () => {
      setExpense({ expense: '0', startState: true });
      setNote('');
    };

    const onRemoveLastCharacter = () => {
      setExpense(prev => {
        return {
          startState: prev.expense.length < 2,
          expense: prev.expense.length === 1 ? '0' : prev.expense.slice(0, -1),
        };
      });
    };

    const todayDate = useMemo(
      () =>
        new Date().toLocaleDateString(Constants.LOCALE, {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      [],
    );

    const onAddExpense = () => [
      // TODO: CALL API
    ];

    return (
      <BottomSheetWrapper snapPoints={[600]} ref={ref} onClose={_onClose}>
        <VStack space="4">
          <VStack p="2" bg={category?.color} alignItems="center" justifyContent="center" space="1">
            <Text variant="input" color="white">
              {t('signedIn.categories.bottomSheet.title')}
            </Text>
            <Text variant="h2" color="white">
              {category?.title}
            </Text>
          </VStack>
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
            <Button variant="ghost" onPress={openModal}>
              <Text variant="body">
                {note?.length === 0 ? t('signedIn.categories.bottomSheet.notes') : note}
              </Text>
            </Button>
            <Divider bg="gray.200" />
            <HStack>
              <Spacer w="20" />
              <Keyboard onKeyboardPress={onKeyboardPress} />
              <VStack>
                <IconButton
                  borderWidth="1"
                  borderColor="gray.200"
                  _pressed={{
                    _light: { bg: 'secondary.100:alpha.20' },
                  }}
                  onPress={onRemoveLastCharacter}
                  h="20"
                  w="20"
                  borderRadius="0"
                  icon={<MaterialIcons name="delete-outline" size={24} color="gray" />}
                />
                <IconButton
                  borderWidth="1"
                  borderColor="gray.200"
                  _pressed={{
                    _light: { bg: 'secondary.100:alpha.20' },
                  }}
                  variant="ghost"
                  h="20"
                  w="20"
                  borderRadius="0"
                  icon={<Entypo name="calendar" size={24} color="gray" />}
                />
                <IconButton
                  onPress={onAddExpense}
                  isDisabled={expense === '0'}
                  _disabled={{
                    _light: { bg: 'secondary.100:alpha.70' },
                  }}
                  _pressed={{
                    _light: { bg: 'secondary.100:alpha.70' },
                  }}
                  h="40"
                  w="20"
                  borderRadius="0"
                  bg={category?.color}
                  icon={<Feather name="check" size={24} color="white" />}
                />
              </VStack>
            </HStack>
            <Box bg="gray.200" w="100%" alignItems="center" p="2">
              <Text variant="label">{todayDate}</Text>
            </Box>
          </VStack>
        </VStack>

        <CustomModal
          title={t('signedIn.categories.bottomSheet.notesModal.title')}
          isOpen={modalOpen}
          onClose={closeModal}>
          <VStack space="4">
            <Input
              pl="0"
              value={note}
              onChangeText={setNote}
              variant="underline"
              placeholder={t('signedIn.categories.bottomSheet.notesModal.placeholder')}
              fontSize="sm"
            />
          </VStack>
        </CustomModal>
      </BottomSheetWrapper>
    );
  },
);
