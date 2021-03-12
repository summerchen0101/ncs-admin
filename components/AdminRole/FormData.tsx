import { useOptionsContext } from '@/context/OptionsContext'
import {} from '@chakra-ui/react'
import { Form, FormInstance, Input, Select, Switch } from 'antd'
import React, { useEffect } from 'react'
export interface AdminRoleFormProps {
  id?: number
  name: string
  permission_ids: number[]
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: AdminRoleFormProps
  form: FormInstance<AdminRoleFormProps>
}) {
  const [permissionOptions] = useOptionsContext().permission

  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item
        label="角色名稱"
        name="name"
        rules={[{ required: true }, { max: 30 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="權限"
        name="permission_ids"
        rules={[{ required: true }]}
      >
        <Select mode="multiple" options={permissionOptions} />
      </Form.Item>
      <Form.Item label="狀態" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default FormData
