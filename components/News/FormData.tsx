import { useOptionsContext } from '@/context/OptionsContext'
import { NewsType } from '@/lib/enums'
import { newsTypeOpts } from '@/lib/options'
import {} from '@chakra-ui/react'
import {
  Form,
  FormInstance,
  Input,
  Select,
  Switch,
  DatePicker,
  Row,
  Col,
} from 'antd'
import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
export interface NewsFormProps {
  id?: number
  title: string
  content: string
  news_type: NewsType
  is_active: boolean
  date_range: [Moment, Moment]
}

function FormData({
  data,
  form,
}: {
  data: NewsFormProps
  form: FormInstance<NewsFormProps>
}) {
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  const disabledDate = (current) => {
    return current && current < moment().startOf('day')
  }
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="標題" name="title">
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={14}>
          <Form.Item label="期間" name="date_range">
            <DatePicker.RangePicker disabledDate={disabledDate} />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item label="公告種類" name="news_type">
            <Select options={newsTypeOpts} placeholder="請選擇" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="簡中內容(3000字以下)" name="content">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="狀態" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default FormData
