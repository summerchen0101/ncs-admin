import { Form, FormInstance, Input, Switch } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
export interface CashflowGroupFormProps {
  id?: number
  name: string
  code: string
  note: string
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: CashflowGroupFormProps
  form: FormInstance<CashflowGroupFormProps>
}) {
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="群組名称" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="代码" name="code" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="备注" name="note">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="状态" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default FormData
