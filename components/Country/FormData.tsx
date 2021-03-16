import { Form, FormInstance, Input, Switch } from 'antd'
import React, { useEffect } from 'react'
export interface CountryFormProps {
  id?: number
  name: string
  code: string
}

function FormData({
  data,
  form,
}: {
  data: CountryFormProps
  form: FormInstance<CountryFormProps>
}) {
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item
        label="名称"
        name="name"
        rules={[{ required: true }, { max: 30 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="代码"
        name="code"
        rules={[{ required: true }, { max: 10 }]}
      >
        <Input disabled={!!data.id} />
      </Form.Item>
    </Form>
  )
}

export default FormData
