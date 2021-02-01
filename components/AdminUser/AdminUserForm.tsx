import { Input, Stack, Switch } from '@chakra-ui/react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import FormField from '../FormField'

export interface AdminUserFormProps {
  acc: string
  pass?: string
  name: string
  role_ids: number[]
  permission_ids: number[]
  is_active: boolean
  is_locked: boolean
}

function AdminUserForm({
  formData,
  onSubmit,
}: {
  formData: AdminUserFormProps
  onSubmit: () => void
}) {
  const { errors, register } = useFormContext<AdminUserFormProps>()
  return (
    <Stack as="form" onSubmit={onSubmit} spacing="20px">
      <Stack direction={['column', 'row']}>
        <FormField label="管理帳號" code="acc" errors={errors}>
          <Input
            name="acc"
            ref={register({ required: true })}
            defaultValue={formData.acc}
          />
        </FormField>
        <FormField label="姓名" code="name" errors={errors}>
          <Input
            name="name"
            ref={register({ required: true })}
            defaultValue={formData.name}
          />
        </FormField>
      </Stack>
      <FormField label="角色" code="role_ids" errors={errors}>
        <Input
          name="role_ids"
          ref={register({ required: true })}
          defaultValue={formData.role_ids.join(', ')}
        />
      </FormField>
      <FormField label="權限" code="permission_ids" errors={errors}>
        <Input
          name="permission_ids"
          ref={register({ required: true })}
          defaultValue={formData.permission_ids.join(', ')}
        />
      </FormField>
      <Stack direction={['row']}>
        <FormField label="啟用" code="is_active" errors={errors}>
          <Switch
            name="is_active"
            colorScheme="teal"
            size="lg"
            defaultChecked={formData.is_active}
          />
        </FormField>
        <FormField label="鎖定" code="is_active" errors={errors}>
          <Switch
            name="is_active"
            colorScheme="red"
            size="lg"
            defaultChecked={formData.is_active}
          />
        </FormField>
      </Stack>
    </Stack>
  )
}

export default AdminUserForm
