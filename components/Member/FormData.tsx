import { AccountingType, MemberType } from '@/lib/enums'
import { accountingTypeOpts, memberTypeOpts } from '@/lib/options'
import { Stack } from '@chakra-ui/react'
import {
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Radio,
  Row,
  Select,
  Switch,
} from 'antd'
import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
import InlineFormField from '../InlineFormField'
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
      <Form.Item label="帳號" name="acc">
        <Input />
      </Form.Item>
      <Form.Item label="暱稱" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="密碼" name="pass">
        <Input.Password />
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

export default FormData
