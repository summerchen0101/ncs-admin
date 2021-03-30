import { useOptionsContext } from '@/context/OptionsContext'
import { NewsType } from '@/lib/enums'
import { newsTypeOpts } from '@/lib/options'
import { Stack } from '@chakra-ui/react'
import {
  Form,
  FormInstance,
  Input,
  Select,
  Switch,
  DatePicker,
  Row,
  Col,
  Radio,
} from 'antd'
import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
import InlineFormField from '../InlineFormField'
export interface NewsFormProps {
  id?: number
  title: string
  content: string
  news_type: NewsType
  is_active: boolean
  date_range_type: string
  limit_range: [Moment, Moment]
}

function FormData({
  data,
  form,
}: {
  data: NewsFormProps
  form: FormInstance<NewsFormProps>
}) {
  const disabledDate = (current) => {
    return current && current < moment().startOf('day')
  }
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="标题" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="期间" name="date_range_type">
        <Stack as={Radio.Group} direction={['column', 'row']} spacing="12px">
          <Radio value="forever">无限期</Radio>
          <Radio value="limit">
            <InlineFormField name="limit_range" w={['auto', 'auto']}>
              <DatePicker.RangePicker />
            </InlineFormField>
          </Radio>
        </Stack>
      </Form.Item>
      <Row gutter={16}>
        <Col span={14}>
          <Form.Item
            label="公告种类"
            name="news_type"
            rules={[{ required: true }]}
          >
            <Select options={newsTypeOpts} placeholder="请选择" />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item label="状态" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="内容" name="content" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
    </Form>
  )
}

export default FormData
