import { useOptionsContext } from '@/context/OptionsContext'
import { HStack } from '@chakra-ui/react'
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
  const [countryOpts] = useOptionsContext('country')
  const [sportOpts] = useOptionsContext('sport')
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="國家"
            name="country_code"
            rules={[{ required: true }]}
          >
            <Select
              options={countryOpts}
              placeholder="請選擇"
              disabled={!!data.id}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="體育"
            name="sport_code"
            rules={[{ required: true }]}
          >
            <Select
              options={sportOpts}
              placeholder="請選擇"
              disabled={!!data.id}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="名稱"
        name="name"
        rules={[{ required: true }, { max: 30 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="代碼"
        name="code"
        rules={[{ required: true }, { max: 10 }]}
      >
        <Input disabled={!!data.id} />
      </Form.Item>
      <Form.Item label="狀態" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default FormData
