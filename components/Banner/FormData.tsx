import { Stack } from '@chakra-ui/layout'
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
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import ImageUpload from '../ImageUpload'
import InlineFormField from '../InlineFormField'
export interface BannerFormProps {
  id?: number
  title: string
  img: string
  img_mobile: string
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
  data: BannerFormProps
  form: FormInstance<BannerFormProps>
}) {
  const mediaTyps = [
    { label: '網頁版圖片', name: 'img' },
    { label: '手機版圖片', name: 'img_mobile' },
  ]

  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="標題" name="title" rules={[{ required: true }]}>
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
      <Form.Item label="連結" name="url">
        <Input placeholder="ex: http://google.com" />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="另開視窗" name="is_blank" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="狀態" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
        {mediaTyps.map((t, i) => (
          <Col span={12} key={i}>
            <Form.Item
              name={t.name}
              label={t.label}
              rules={[{ required: true, message: '請選擇圖片' }]}
            >
              <ImageUpload />
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Form>
  )
}

export default FormData
