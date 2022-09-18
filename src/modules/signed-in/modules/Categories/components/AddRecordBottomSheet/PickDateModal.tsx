import React, { forwardRef, useImperativeHandle, useState } from 'react';

import { Entypo, Feather } from '@expo/vector-icons';
import { Button, HStack, Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-native-date-picker';

import { CustomModal } from 'components';
import { useModal } from 'hooks';

export type PickDateModalHandle = {
  openModal: (expenseDate: Date | null) => void;
};

type Props = {
  setExpenseDate: (date: Date) => void;
};

export const PickDateModal = forwardRef<PickDateModalHandle | undefined, Props>(
  ({ setExpenseDate }, ref) => {
    const { t } = useTranslation();

    const { modalOpen, data, closeModal, openModal: _openModal } = useModal<Date | null>();
    const [calendarOpen, setCalendarOpen] = useState(false);

    const _setExpenseDate = (date: Date) => {
      setExpenseDate(date);
      closeModal();
    };

    const openModal = (expenseDate: Date | null) => {
      _openModal(expenseDate);
    };

    useImperativeHandle(ref, () => ({
      openModal,
    }));

    return (
      <CustomModal isOpen={modalOpen} onClose={closeModal}>
        <VStack space="2">
          <Button
            variant="ghost"
            borderColor="gray.200"
            borderWidth="1"
            onPress={() => setCalendarOpen(true)}>
            <VStack space="4" justifyContent="center" alignItems="center">
              <Entypo name="calendar" size={24} color="gray" />
              <Text>{t('signedIn.categories.bottomSheet.calendarModal.pickDay')}</Text>
            </VStack>
          </Button>
          <HStack space="10%">
            <Button
              onPress={() => {
                _setExpenseDate(new Date(new Date().setDate(new Date().getDate() - 1)));
              }}
              maxW="45%"
              borderColor="gray.200"
              borderWidth="1"
              bg={isYesterday(data) ? 'secondary.400' : 'transparent'}>
              <VStack space="4" justifyContent="center" alignItems="center">
                <Entypo name="moon" size={24} color={isYesterday(data) ? 'white' : 'gray'} />
                <Text color={isYesterday(data) ? 'white' : 'primary.100'}>
                  {t('signedIn.categories.bottomSheet.calendarModal.yesterday')}
                </Text>
              </VStack>
            </Button>
            <Button
              onPress={() => {
                _setExpenseDate(new Date());
              }}
              maxW="45%"
              borderColor="gray.200"
              borderWidth="1"
              bg={isToday(data) ? 'secondary.400' : 'transparent'}>
              <VStack space="4" justifyContent="center" alignItems="center">
                <Feather name="sun" size={24} color={isToday(data) ? 'white' : 'gray'} />
                <Text color={isToday(data) ? 'white' : 'primary.100'}>
                  {t('signedIn.categories.bottomSheet.calendarModal.today')}
                </Text>
              </VStack>
            </Button>
          </HStack>
        </VStack>
        <DatePicker
          mode="date"
          modal
          open={calendarOpen}
          date={new Date()}
          onConfirm={date => {
            if (date < new Date()) {
              setExpenseDate(date);
            }
            setCalendarOpen(false);
            closeModal();
          }}
          onCancel={() => {
            setCalendarOpen(false);
          }}
        />
      </CustomModal>
    );
  },
);

const isToday = (date?: Date | null) => {
  if (!date) return false;

  const today = new Date();
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
};

const isYesterday = (date?: Date | null) => {
  if (!date) return false;

  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  return (
    date.getDate() == yesterday.getDate() &&
    date.getMonth() == yesterday.getMonth() &&
    date.getFullYear() == yesterday.getFullYear()
  );
};
