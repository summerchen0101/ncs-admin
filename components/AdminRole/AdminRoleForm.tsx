import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { AdminRole } from '@/types/api/AdminRole'
import useAdminRoleService from '@/utils/services/useAdminRoleService'
import { Input, Stack, Switch } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import FormField from '../FormField'
import PopupForm from '../PopupForm'

interface FormProps {
  acc: string
  name: string
  role_ids: number[]
  permission_ids: number[]
  is_active: boolean
  is_locked: boolean
}

function AdminRoleForm() {
  const {
    handleSubmit,
    errors,
    register,
    formState,
    reset,
  } = useForm<FormProps>()
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
      title="新增/編輯管理員"
      isOpen={visible}
      onClose={() => setVisible(false)}
      isLoading={formState.isSubmitting}
      size="lg"
    >
      <Stack as="form" onSubmit={onSubmit} spacing="20px">
        <Stack direction={['column', 'row']}>
          <FormField label="管理帳號" code="acc" errors={errors}>
            <Input
              name="acc"
              ref={register({ required: true })}
              defaultValue={viewData.acc}
            />
          </FormField>
          <FormField label="姓名" code="name" errors={errors}>
            <Input
              name="name"
              ref={register({ required: true })}
              defaultValue={viewData.name}
            />
          </FormField>
        </Stack>
        <FormField label="角色" code="role_ids" errors={errors}>
          <Input
            name="role_ids"
            ref={register({ required: true })}
            defaultValue={viewData.roles.map((r) => r.name).join(', ')}
          />
        </FormField>
        <FormField label="權限" code="permission_ids" errors={errors}>
          <Input
            name="permission_ids"
            ref={register({ required: true })}
            defaultValue={viewData.permissions.map((r) => r.name).join(', ')}
          />
        </FormField>
        <Stack direction={['row']}>
          <FormField label="啟用" code="is_active" errors={errors}>
            <Switch
              name="is_active"
              colorScheme="green"
              size="lg"
              defaultChecked={viewData.is_active}
            />
          </FormField>
          <FormField label="鎖定" code="is_active" errors={errors}>
            <Switch
              name="is_active"
              colorScheme="red"
              size="lg"
              defaultChecked={viewData.is_active}
            />
          </FormField>
        </Stack>
      </Stack>
    </PopupForm>
  )
}

export default AdminRoleForm
