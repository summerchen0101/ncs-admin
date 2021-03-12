import {
  Box,
  Checkbox,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Divider, Form, FormInstance, Input, Select } from 'antd'
import moment, { Moment } from 'moment'
import React from 'react'
export interface MarqueeFormProps {
  id?: number
  content: string
  date_range_type: string
  limit_range: [Moment, Moment]
  is_active: boolean
  is_blank: boolean
  url: string
}

function FormData({
  data,
  form,
}: {
  data: MarqueeFormProps
  form: FormInstance<MarqueeFormProps>
}) {
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="群組名稱" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="備註" name="note">
        <Input.TextArea />
      </Form.Item>
    </Form>
  )
}

export default FormData
