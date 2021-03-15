import { Stack } from '@chakra-ui/react'
import {
  Col,
  DatePicker,
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
  const disabledDate = (current) => {
    return current && current < moment().startOf('day')
  }
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="内容(50字以下)" name="content">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="期间" name="date_range_type">
        <Stack as={Radio.Group} direction={['column', 'row']} spacing="12px">
          <Radio value="forever">无限期</Radio>
          <Radio value="limit">
            <InlineFormField name="limit_range" w={['auto', 'auto']}>
              <DatePicker.RangePicker disabledDate={disabledDate} />
            </InlineFormField>
          </Radio>
        </Stack>
      </Form.Item>
      <Form.Item label="连结" name="url">
        <Input placeholder="ex: http://google.com" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="状态" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="另开窗口" name="is_blank" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default FormData
