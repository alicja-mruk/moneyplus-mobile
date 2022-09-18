import { useCallback, useState } from 'react';

export const useModal = <T>() => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<T>();

  const closeModal = useCallback(() => setModalOpen(false), []);
  const openModal = useCallback((data?: T) => {
    data && setData(data);
    setModalOpen(true);
  }, []);

  return { modalOpen, data, closeModal, openModal };
};
