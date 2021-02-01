import { usePopupContext } from '@/context/PopupContext'
import useAdminRoleService from '@/utils/services/useAdminRoleService'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PopupForm from '../PopupForm'
import FormData, { AdminRoleFormProps } from './FormData'

function CreatePopup() {
  const methods = useForm<AdminRoleFormProps>()
  const { handleSubmit, formState } = methods
  const { doCreate } = useAdminRoleService()
  const [visible, setVisible] = usePopupContext('createForm')
  const onSubmit = handleSubmit(async (d) => {
    await doCreate({
      name: d.name,
      permission_ids: d.permission_ids,
      is_active: d.is_active,
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
            name: '',
            permission_ids: [],
            is_active: true,
          }}
        />
      </FormProvider>
    </PopupForm>
  )
}

export default CreatePopup
