import { usePopupProvider } from '@/context/PopupContext'
import useAdminUserService from '@/utils/services/useAdminUserService'
import { Input, Stack } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import FormField from '../FormField'
import PopupForm from '../PopupForm'

interface FormProps {
  acc: string
  name: string
  pass: string
}

function AdminUserForm() {
  const {
    handleSubmit,
    errors,
    register,
    formState,
    reset,
  } = useForm<FormProps>()
  const { doCreate } = useAdminUserService()
  const onSubmit = handleSubmit(doCreate)
  const [visible, setVisible] = usePopupProvider('editForm')
  return (
    <PopupForm
      title="新增/編輯管理員"
      isOpen={visible}
      onClose={() => setVisible(false)}
      isLoading={formState.isSubmitting}
    >
      <Stack as="form" onSubmit={onSubmit} spacing="20px">
        <FormField label="管理帳號" code="acc" errors={errors}>
          <Input
            name="acc"
            ref={register({ required: true })}
            bgColor="white"
          />
        </FormField>
        <FormField label="密碼" code="pass" errors={errors}>
          <Input
            name="pass"
            type="password"
            ref={register({ required: true })}
            bgColor="white"
          />
        </FormField>
      </Stack>
    </PopupForm>
  )
}

export default AdminUserForm
