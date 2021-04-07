import { useOptionsContext } from '@/context/OptionsContext'
import { PaymentType } from '@/lib/enums'
import { paymentTypeOpts } from '@/lib/options'
import { SimpleGrid } from '@chakra-ui/layout'
import { Form, FormInstance, Input, Select, Switch } from 'antd'
import React, { useEffect } from 'react'
export interface PaymentGatewayFormProps {
  id?: number
  merchant_id: number
  single_deposit_least: number
  single_deposit_limit: number
  deposit_fee: number
  deposit_fee_percent: number
  deposit_limit_day: number
  deposit_limit_week: number
  deposit_limit_mon: number
  is_active: boolean
  payment_type: PaymentType
}

function FormData({
  data,
  form,
}: {
  data: PaymentGatewayFormProps
  form: FormInstance<PaymentGatewayFormProps>
}) {
  const [cashflowMerchantOpts] = useOptionsContext().cashflowMerchant
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={2} spacingX="20px">
        <Form.Item
          label="金流商户"
          name="merchant_id"
          rules={[{ required: true }]}
        >
          <Select options={cashflowMerchantOpts} placeholder="请选择" />
        </Form.Item>
        <Form.Item
          label="付款方式"
          name="payment_type"
          rules={[{ required: true }]}
        >
          <Select options={paymentTypeOpts} placeholder="请选择" />
        </Form.Item>
        <Form.Item
          label="单次储值下限"
          name="single_deposit_least"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="单次储值上限"
          name="single_deposit_limit"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="手续费"
          name="deposit_fee"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="手续费%"
          name="deposit_fee_percent"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="日储值上限"
          name="deposit_limit_day"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="週储值上限"
          name="deposit_limit_week"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="月储值上限"
          name="deposit_limit_mon"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="状态" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
      </SimpleGrid>
    </Form>
  )
}

export default FormData
