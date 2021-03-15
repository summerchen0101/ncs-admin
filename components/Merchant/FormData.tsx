import { Box, SimpleGrid } from '@chakra-ui/react'
import { Form, FormInstance, Input, Switch } from 'antd'
import React, { useEffect } from 'react'
export interface MerchantFormProps {
  id?: number
  acc?: string
  pass?: string
  name: string
  prefix: string
  domain: string
  biz_email: string
  biz_telegram: string
  finance_email: string
  finance_telegram: string
  tech_email: string
  tech_telegram: string
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: MerchantFormProps
  form: FormInstance<MerchantFormProps>
}) {
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={2} spacing={4}>
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="前缀" name="prefix" rules={[{ required: true }]}>
          <Input disabled={!!data.id} />
        </Form.Item>
        {!data.id && (
          <>
            <Form.Item label="帐号" name="acc" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="密码" name="pass" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
          </>
        )}
        <Form.Item label="网域" name="domain" rules={[{ required: true }]}>
          <Input placeholder="ex: http://xxx.com" />
        </Form.Item>
        <Form.Item label="状态" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item
          label="商务 Email"
          name="biz_email"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="商务 Telegram"
          name="biz_telegram"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="财务 Email"
          name="finance_email"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="财务 Telegram"
          name="finance_telegram"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="技术 Email"
          name="tech_email"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="技术 Telegram"
          name="tech_telegram"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </SimpleGrid>
    </Form>
  )
}

export default FormData
