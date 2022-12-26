import { useCallback, useState } from 'react';

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = useCallback(() => setModalOpen(false), []);
  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  return { modalOpen, closeModal, openModal };
};
