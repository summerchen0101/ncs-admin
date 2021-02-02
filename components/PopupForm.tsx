import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import React from 'react'

type PopupFormProps = {
  children?: React.ReactNode
  title: string
  isLoading?: boolean
  onSubmit?: () => void
}

function PopupForm({
  children,
  title,
  isLoading,
  onClose,
  onSubmit,
  ...rest
}: PopupFormProps & ModalProps) {
  return (
    <Modal onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent m={[0, 'auto']} h={['100vh', 'auto']} overflowY="auto">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{children}</ModalBody>
        {onSubmit && (
          <SimpleGrid as={ModalFooter} spacing="15px" columns={2}>
            <Button colorScheme="blue" onClick={onSubmit} isLoading={isLoading}>
              送出
            </Button>
            <Button onClick={onClose}>取消</Button>
          </SimpleGrid>
        )}
      </ModalContent>
    </Modal>
  )
}

export default PopupForm
