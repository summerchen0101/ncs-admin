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
  Stack,
} from '@chakra-ui/react'
import React from 'react'

type PopupFormProps = {
  children?: React.ReactNode
  title: string
  isLoading?: boolean
}

function PopupForm({
  children,
  title,
  isLoading,
  onClose,
  ...rest
}: PopupFormProps & ModalProps) {
  return (
    <Modal onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent m={[0, 'auto']} h={['100vh', 'auto']} overflowY="auto">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{children}</ModalBody>
        <ModalFooter>
          <Stack
            direction={['column', 'row']}
            w="full"
            justifyContent="flex-end"
          >
            <Button colorScheme="teal" type="submit" isLoading={isLoading}>
              送出
            </Button>
            <Button onClick={onClose}>取消</Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PopupForm
