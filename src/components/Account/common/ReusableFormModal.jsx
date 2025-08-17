import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

export default function ReusableFormModal({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  isSubmitting = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textDecoration="underline">{title}</ModalHeader>
        <ModalCloseButton />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) onSubmit();
          }}
        >
          <ModalBody>{children}</ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
}
