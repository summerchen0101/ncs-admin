import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { AdminRole } from '@/types/api/AdminRole'
import useAdminRoleService from '@/utils/services/useAdminRoleService'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PopupForm from '../PopupForm'
import FormData, { AdminRoleFormProps } from './FormData'

function EditPopup() {
  const methods = useForm<AdminRoleFormProps>()
  const { handleSubmit, formState } = methods
  const { doEdit } = useAdminRoleService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<AdminRole>()
  const onSubmit = handleSubmit(async (d) => {
    await doEdit({
      id: viewData.id,
      name: d.name,
      permission_ids: d.permission_ids,
      is_active: d.is_active,
    })
  })
  if (!viewData) return <></>
  return (
    <PopupForm
      title="編輯管理員"
      isOpen={visible}
      onClose={() => setVisible(false)}
      isLoading={formState.isSubmitting}
      size="lg"
    >
      <FormProvider {...methods}>
        <FormData
          onSubmit={onSubmit}
          data={{
            id: viewData.id,
            name: viewData.name,
            permission_ids: viewData.permissions.map((t) => t.id),
            is_active: viewData.is_active,
          }}
        />
      </FormProvider>
    </PopupForm>
  )
}

export default EditPopup
