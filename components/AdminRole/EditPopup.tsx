import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { AdminRole } from '@/types/api/AdminRole'
import useAdminRoleService from '@/utils/services/useAdminRoleService'
import React from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
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
      acc: d.acc,
      name: d.name,
      role_ids: d.role_ids,
      permission_ids: d.permission_ids,
      is_active: d.is_active,
      status: d.is_locked ? BlockStatus.Blocked : BlockStatus.Normal,
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
            acc: viewData.acc,
            name: viewData.name,
            role_ids: viewData.roles.map((t) => t.id),
            permission_ids: viewData.permissions.map((t) => t.id),
            is_active: viewData.is_active,
            is_locked: viewData.status === BlockStatus.Blocked,
          }}
        />
      </FormProvider>
    </PopupForm>
  )
}

export default EditPopup
