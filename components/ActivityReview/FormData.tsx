import { Stack, Text } from '@chakra-ui/react'
import {
  Col,
  DatePicker,
  Descriptions,
  Form,
  FormInstance,
  Input,
  Radio,
  Row,
  Switch,
} from 'antd'
import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
import InlineFormField from '../InlineFormField'
export interface ActivityReviewFormProps {
  id?: number
  title: string
  content: string
  date_range_type: string
  limit_range: [Moment, Moment]
  is_active: boolean
  content_mobile: string
  img: string
  img_mobile: string
  bonus: number
}

function FormData({
  data,
  form,
}: {
  data: ActivityReviewFormProps
  form: FormInstance<ActivityReviewFormProps>
}) {
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  const disabledDate = (current) => {
    return current && current < moment().startOf('day')
  }
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="活動名稱">儲值滿3000送300</Descriptions.Item>
        <Descriptions.Item label="帳號">gogoro123</Descriptions.Item>
        <Descriptions.Item label="活動獎金">$1000</Descriptions.Item>
        <Descriptions.Item label="備註">-</Descriptions.Item>
      </Descriptions>
    </Form>
  )
}

export default FormData
