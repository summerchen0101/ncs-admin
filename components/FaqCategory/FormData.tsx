import { Form, FormInstance, Input, InputNumber, Switch } from 'antd'
import React, { useEffect } from 'react'
export interface FaqCategoryFormProps {
  id?: number
  name: string
  sort: number
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: FaqCategoryFormProps
  form: FormInstance<FaqCategoryFormProps>
}) {

  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item
        label="名稱"
        name="name"
        rules={[{ required: true }, { max: 30 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="排序" name="sort">
        <InputNumber />
      </Form.Item>
      <Form.Item label="狀態" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default FormData
