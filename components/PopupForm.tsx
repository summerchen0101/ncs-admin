import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'

type PopupFormProps = {
  children?: React.ReactNode
  title: string
  isOpen: boolean
  onClose: () => void
  isLoading?: boolean
}

function PopupForm({
  children,
  title,
  isOpen,
  onClose,
  isLoading,
}: PopupFormProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{children}</ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} type="submit" isLoading={isLoading}>
            送出
          </Button>
          <Button onClick={onClose}>取消</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PopupForm
