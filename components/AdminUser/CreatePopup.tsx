import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { AdminUser } from '@/types/api/AdminUser'
import useAdminUserService from '@/utils/services/useAdminUserService'
import React from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import PopupForm from '../PopupForm'
import FormData, { AdminUserFormProps } from './FormData'

function CreatePopup() {
  const methods = useForm<AdminUserFormProps>()
  const { handleSubmit, formState } = methods
  const { doCreate } = useAdminUserService()
  const [visible, setVisible] = usePopupContext('createForm')
  const { viewData } = useDataContext<AdminUser>()
  const onSubmit = handleSubmit(async (d) => {
    await doCreate({
      acc: d.acc,
      pass: d.pass,
      name: d.name,
      role_ids: d.role_ids,
      permission_ids: d.permission_ids,
      is_active: d.is_active,
      status: d.is_locked ? BlockStatus.Blocked : BlockStatus.Normal,
    })
  })
  return (
    <PopupForm
      title="新增管理員"
      isOpen={visible}
      onClose={() => setVisible(false)}
      isLoading={formState.isSubmitting}
      size="lg"
    >
      <FormProvider {...methods}>
        <FormData
          onSubmit={onSubmit}
          data={{
            acc: '',
            name: '',
            role_ids: [],
            permission_ids: [],
            is_active: true,
            is_locked: false,
          }}
        />
      </FormProvider>
    </PopupForm>
  )
}

export default CreatePopup