import React, { forwardRef, useImperativeHandle } from 'react';

import { Input, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';

import { CustomModal } from 'components';
import { useModal } from 'hooks';

export type NotesModalHandle = {
  openModal: (note: string) => void;
};

type Props = {
  setNote: (value: string) => void;
};

export const NotesModal = forwardRef<NotesModalHandle | undefined, Props>(({ setNote }, ref) => {
  const { t } = useTranslation();

  const { modalOpen, data, closeModal, openModal: _openModal } = useModal<string>();

  const openModal = (note: string) => {
    _openModal(note);
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  return (
    <CustomModal
      title={t('signedIn.categories.bottomSheet.notesModal.title')}
      isOpen={modalOpen}
      onClose={closeModal}>
      <VStack space="4">
        <Input
          pl="0"
          value={data}
          onChangeText={setNote}
          variant="underline"
          placeholder={t('signedIn.categories.bottomSheet.notesModal.placeholder')}
          fontSize="sm"
        />
      </VStack>
    </CustomModal>
  );
});
