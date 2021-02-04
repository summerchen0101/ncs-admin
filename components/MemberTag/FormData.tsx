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
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="標籤名稱" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="說明" name="content">
        <Input.TextArea />
      </Form.Item>
    </Form>
  )
}

export default FormData
