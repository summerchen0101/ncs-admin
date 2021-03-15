import { Form, FormInstance, Input } from 'antd'
import { Moment } from 'moment'
import React from 'react'
export interface MarqueeFormProps {
  id?: number
  content: string
  date_range_type: string
  limit_range: [Moment, Moment]
  is_active: boolean
  is_blank: boolean
  url: string
}

function FormData({
  data,
  form,
}: {
  data: MarqueeFormProps
  form: FormInstance<MarqueeFormProps>
}) {
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="名称" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="代码" name="code" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  )
}

export default FormData
