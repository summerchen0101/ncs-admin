import { Form, FormInstance, Input } from 'antd'
import React, { useEffect } from 'react'
import ColorPicker from '../ColorPicker'
export interface MemberTagFormProps {
  id?: number
  name: string
  color: string
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
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="标籤名称" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="颜色" name="color" rules={[{ required: true }]}>
        <ColorPicker />
      </Form.Item>
      <Form.Item label="说明" name="content" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
    </Form>
  )
}

export default FormData
