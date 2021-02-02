import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { AdminUser } from '@/types/api/AdminUser'
import useAdminUserService from '@/utils/services/useAdminUserService'
import { Input, Stack } from '@chakra-ui/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormField from '../FormField'
import PopupForm from '../PopupForm'
import FormData, { AdminUserFormProps } from './FormData'

function PasswordPopup() {
  const {
    errors,
    register,
    handleSubmit,
    formState,
    watch,
  } = useForm<AdminUserFormProps>()
  const { doEditPass } = useAdminUserService()
  const [visible, setVisible] = usePopupContext('passwordForm')
  const { viewId } = useDataContext<AdminUser>()
  const onSubmit = handleSubmit(async (d) => {
    await doEditPass(viewId, d.pass)
  })
  return (
    <PopupForm
      title="密碼修改"
      isOpen={visible}
      onSubmit={onSubmit}
      onClose={() => setVisible(false)}
      isLoading={formState.isSubmitting}
      size="sm"
    >
      <Stack as="form" spacing="20px">
        <FormField label="密碼" code="pass" errors={errors}>
          <Input
            name="pass"
            type="password"
            ref={register({ required: true })}
            bgColor="gray.100"
          />
        </FormField>
        <FormField label="確認密碼" code="pass_c" errors={errors}>
          <Input
            name="pass_c"
            type="password"
            ref={register({
              required: true,
              validate: (value) =>
                value !== watch('pass') ? '密碼不同' : true,
            })}
            bgColor="gray.100"
          />
        </FormField>
      </Stack>
    </PopupForm>
  )
}

export default PasswordPopup
