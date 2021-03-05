import { Form, FormInstance, Input } from 'antd'
import React, { useEffect } from 'react'

export interface MemberTagFormProps {
  id?: number
  name: string
  content: string
}

function FormData({
  data,
  form,
}: {
  data: MemberTagFormProps
  form: FormInstance<MemberTagFormProps>
}) {
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="標籤名稱" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="說明" name="content" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
    </Form>
  )
}

export default FormData
