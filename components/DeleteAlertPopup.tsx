import { useAlertContext } from '@/context/AlertContext'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import React, { useRef } from 'react'

type DeleteAlertPopupProps = {
  onConfirm: (msg: string) => void
  isOpen: boolean
  onClose: () => void
  children: JSX.Element
}

function DeleteAlertPopup({
  onConfirm,
  children,
  onClose,
  isOpen,
}: DeleteAlertPopupProps) {
  // const { onClose, isOpen } = useAlertContext('deleteAlert')
  const cancelRef = useRef()
  return (
    <>
      {children}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>提示</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>是否確認刪除？</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              取消
            </Button>
            <Button colorScheme="red" ml={3} onClick={() => onConfirm('hello')}>
              刪除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteAlertPopup
