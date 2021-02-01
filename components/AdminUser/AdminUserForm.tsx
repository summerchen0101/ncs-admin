import { Input, SimpleGrid, Stack, Switch } from '@chakra-ui/react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import FormField from '../FormField'

export interface AdminUserFormProps {
  id?: number
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
  const { errors, register, watch } = useFormContext<AdminUserFormProps>()
  return (
    <Stack as="form" onSubmit={onSubmit} spacing="20px">
      <SimpleGrid columns={[1, 2]} spacing="15px">
        <FormField label="管理帳號" code="acc" errors={errors}>
          <Input
            name="acc"
            ref={register({ required: true })}
            defaultValue={formData.acc}
            bgColor="gray.100"
          />
        </FormField>
        <FormField label="姓名" code="name" errors={errors}>
          <Input
            name="name"
            ref={register({ required: true })}
            defaultValue={formData.name}
            bgColor="gray.100"
          />
        </FormField>
        {!formData.id && (
          <>
            <FormField label="密碼" code="pass" errors={errors}>
              <Input
                name="password"
                ref={register({ required: true })}
                bgColor="gray.100"
              />
            </FormField>
            <FormField label="確認密碼" code="pass_c" errors={errors}>
              <Input
                name="password"
                ref={register({
                  required: true,
                  validate: (value) =>
                    value !== watch('pass') ? '密碼不同' : true,
                })}
                bgColor="gray.100"
              />
            </FormField>
          </>
        )}
      </SimpleGrid>
      <FormField label="角色" code="role_ids" errors={errors}>
        <Input
          name="role_ids"
          ref={register({ required: true })}
          defaultValue={formData.role_ids.join(', ')}
          bgColor="gray.100"
        />
      </FormField>
      <FormField label="權限" code="permission_ids" errors={errors}>
        <Input
          name="permission_ids"
          ref={register({ required: true })}
          defaultValue={formData.permission_ids.join(', ')}
          bgColor="gray.100"
        />
      </FormField>
      <SimpleGrid columns={2} spacing="15px">
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
      </SimpleGrid>
    </Stack>
  )
}

export default AdminUserForm
