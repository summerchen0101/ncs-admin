import { useOptionsContext } from '@/context/OptionsContext'
import { Input, SimpleGrid, Stack, Switch } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import FormField from '../FormField'
import MultiSelect from '../MultiSelect'

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

function FormData({ data }: { data: AdminUserFormProps }) {
  const {
    errors,
    register,
    watch,
    setValue,
  } = useFormContext<AdminUserFormProps>()
  const [permissionOptions] = useOptionsContext('permissions')
  const [roleOptions] = useOptionsContext('roles')
  useEffect(() => {
    register('role_ids', { required: '角色必填' })
    register('permission_ids', { required: '權限必填' })
  }, [])
  return (
    <Stack as="form" spacing="20px">
      <SimpleGrid columns={[1, 2]} spacing="15px">
        <FormField label="管理帳號" code="acc" errors={errors}>
          <Input
            name="acc"
            ref={register({ required: '帳號必填' })}
            defaultValue={data.acc}
            bgColor="gray.100"
          />
        </FormField>
        <FormField label="姓名" code="name" errors={errors}>
          <Input
            name="name"
            ref={register({ required: '姓名必填' })}
            defaultValue={data.name}
            bgColor="gray.100"
          />
        </FormField>
        {!data.id && (
          <>
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
          </>
        )}
      </SimpleGrid>
      <FormField label="角色" code="role_ids" errors={errors}>
        <MultiSelect
          inValid={!!errors.role_ids}
          options={roleOptions}
          onChange={(v) => {
            setValue('role_ids', v)
          }}
          value={data.role_ids}
        />
      </FormField>

      <FormField label="權限" code="permission_ids" errors={errors}>
        <MultiSelect
          inValid={!!errors.permission_ids}
          options={permissionOptions}
          onChange={(v) => {
            setValue('permission_ids', v)
          }}
          value={data.permission_ids}
        />
      </FormField>
      <SimpleGrid columns={2} spacing="15px">
        <FormField label="啟用" code="is_active" errors={errors}>
          <Switch
            name="is_active"
            colorScheme="teal"
            size="lg"
            defaultChecked={data.is_active}
            ref={register}
          />
        </FormField>
        {data.id && (
          <FormField label="鎖定" code="is_locked" errors={errors}>
            <Switch
              name="is_locked"
              colorScheme="red"
              size="lg"
              defaultChecked={data.is_locked}
              ref={register}
            />
          </FormField>
        )}
      </SimpleGrid>
    </Stack>
  )
}

export default FormData
