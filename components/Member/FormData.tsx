import { AccountingType, MemberType } from '@/lib/enums'
import { accountingTypeOpts, memberTypeOpts } from '@/lib/options'
import { Col, Form, FormInstance, Input, Row, Select, Switch } from 'antd'
import React, { useEffect } from 'react'
export interface MemberFormProps {
  id?: number
  name: string
  acc: string
  pass: string
  member_type: MemberType
  accounting_type: AccountingType
  // parent_id: number
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: MemberFormProps
  form: FormInstance<MemberFormProps>
}) {
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="會員種類" name="member_type">
            <Select options={memberTypeOpts} disabled={!!data.id} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="帳務類型" name="accounting_type">
            <Select options={accountingTypeOpts} disabled={!!data.id} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="帳號" name="acc">
        <Input />
      </Form.Item>
      <Form.Item label="暱稱" name="name">
        <Input />
      </Form.Item>
      {!data.id && (
        <Form.Item label="密碼" name="pass">
          <Input.Password />
        </Form.Item>
      )}

      <Form.Item label="狀態" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default FormData
