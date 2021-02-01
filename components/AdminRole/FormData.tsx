import { useOptionsContext } from '@/context/OptionsContext'
import { Input, Select, SimpleGrid, Stack, Switch } from '@chakra-ui/react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import FormField from '../FormField'

export interface AdminRoleFormProps {
  id?: number
  name: string
  permission_ids: number[]
  is_active: boolean
}

function FormData({
  data,
  onSubmit,
}: {
  data: AdminRoleFormProps
  onSubmit: () => void
}) {
  const { errors, register, watch } = useFormContext<AdminRoleFormProps>()
  const [permissionOptions] = useOptionsContext('permissions')
  return (
    <Stack as="form" onSubmit={onSubmit} spacing="20px">
      <FormField label="角色名稱" code="name" errors={errors}>
        <Input
          name="name"
          ref={register({ required: true })}
          defaultValue={data.name}
          bgColor="gray.100"
        />
      </FormField>
      <FormField label="權限" code="permission_ids" errors={errors}>
        <Select
          name="permission_ids"
          ref={register({ required: true })}
          bgColor="gray.100"
        >
          {permissionOptions.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </Select>
      </FormField>
      <SimpleGrid columns={2} spacing="15px">
        <FormField label="啟用" code="is_active" errors={errors}>
          <Switch
            name="is_active"
            colorScheme="teal"
            size="lg"
            defaultChecked={data.is_active}
          />
        </FormField>
      </SimpleGrid>
    </Stack>
  )
}

export default FormData
