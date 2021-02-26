import { RechargeType } from '@/lib/enums'
import { rechargeTypeOpts } from '@/lib/options'
import { Form, FormInstance, Input, InputNumber, Select } from 'antd'
import React, { useEffect } from 'react'

export interface RechargeRecFormProps {
  id?: number
  acc: string
  amount: number
  type: RechargeType
}

function FormData({
  data,
  form,
}: {
  data: RechargeRecFormProps
  form: FormInstance<RechargeRecFormProps>
}) {
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="類型" name="type">
        <Select options={rechargeTypeOpts} />
      </Form.Item>
      <Form.Item label="點數" name="amount">
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="會員帳號" name="acc">
        <Input />
      </Form.Item>
      <Form.Item label="備註" name="note">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default FormData
