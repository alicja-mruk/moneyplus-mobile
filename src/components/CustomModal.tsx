import React from 'react';

import { Box, Modal, Text, VStack } from 'native-base';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
};

export const CustomModal = ({ children, isOpen, onClose, title, subtitle }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content p="2">
        <Box p="6">
          <Modal.CloseButton />
        </Box>
        <Modal.Body>
          <VStack>
            <Text variant="h2">{title}</Text>
            {subtitle && (
              <Text mb="6" variant="body">
                {subtitle}
              </Text>
            )}
          </VStack>
        </Modal.Body>
        <Modal.Body>{children}</Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
