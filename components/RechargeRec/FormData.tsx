import { RechargeType } from '@/lib/enums'
import { rechargeTypeOpts } from '@/lib/options'
import { SimpleGrid } from '@chakra-ui/layout'
import { Form, FormInstance, Input, InputNumber, Radio, Select } from 'antd'
import React, { useEffect } from 'react'

export interface RechargeRecFormProps {
  id?: number
  acc: string
  amount: number
  note: string
  recharge_type: RechargeType
}

function FormData({
  data,
  form,
}: {
  data: RechargeRecFormProps
  form: FormInstance<RechargeRecFormProps>
}) {
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="类型" name="recharge_type" rules={[{ required: true }]}>
        <Radio.Group options={rechargeTypeOpts} />
      </Form.Item>
      <SimpleGrid spacing="15px" columns={2}>
        <Form.Item label="点数" name="amount" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} step={100} min={1} />
        </Form.Item>
        <Form.Item label="会员帐号" name="acc" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </SimpleGrid>
      <Form.Item label="备注" name="note">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default FormData
