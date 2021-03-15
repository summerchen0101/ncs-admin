import { Col, DatePicker, Form, FormInstance, Input, Row, Switch } from 'antd'
import { Moment } from 'moment'
import React from 'react'
import ImageUpload from '../ImageUpload'
export interface BannerFormProps {
  id?: number
  title: string
  img: string
  img_mobile: string
  date_range: [Moment, Moment]
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
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="標題" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="廣告期間" name="date_range">
        <DatePicker.RangePicker />
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
