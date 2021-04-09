import { useOptionsContext } from '@/context/OptionsContext'
import { HStack, SimpleGrid } from '@chakra-ui/react'
import { Form, FormInstance, Input, Switch, Select, Row, Col } from 'antd'
import React, { useEffect } from 'react'

export interface SportGameFormProps {
  id?: number
  name: string
  code: string
  country_code: string
  sport_code: string
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: SportGameFormProps
  form: FormInstance<SportGameFormProps>
}) {
  const [countryOpts] = useOptionsContext().country
  const [sportOpts] = useOptionsContext().sport

  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={2} spacingX="20px">
        <Form.Item
          label="国家"
          name="country_code"
          rules={[{ required: true }]}
        >
          <Select
            options={countryOpts}
            placeholder="请选择"
            disabled={!!data.id}
          />
        </Form.Item>
        <Form.Item label="体育" name="sport_code" rules={[{ required: true }]}>
          <Select
            options={sportOpts}
            placeholder="请选择"
            disabled={!!data.id}
          />
        </Form.Item>
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
        <Form.Item label="状态" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
      </SimpleGrid>
    </Form>
  )
}

export default FormData
