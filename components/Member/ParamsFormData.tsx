import { accountingTypeOpts, memberTypeOpts } from '@/lib/options'
import { Col, Form, FormInstance, Input, Row, Select, Switch } from 'antd'
import React, { useEffect } from 'react'
export interface ParamsFormProps {
  id?: number
}

function ParamsFormData({
  data,
  form,
}: {
  data: ParamsFormProps
  form: FormInstance<ParamsFormProps>
}) {
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="額度">
        <Input addonAfter="300000" />
      </Form.Item>
      <Form.Item label="單注下限">
        <Input />
      </Form.Item>
      <Form.Item label="單注上限">
        <Input />
      </Form.Item>
      <Form.Item label="單隊上限">
        <Input />
      </Form.Item>
      <Form.Item label="單場上限">
        <Input />
      </Form.Item>
      <Form.Item label="回復設定">
        <Select
          options={[
            { label: '每日中午12點', value: 1 },
            { label: '每週日中午12點', value: 2 },
          ]}
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="會員種類" name="member_type">
            <Select options={memberTypeOpts} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="帳務類型" name="accounting_type">
            <Select options={accountingTypeOpts} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="狀態" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default ParamsFormData
