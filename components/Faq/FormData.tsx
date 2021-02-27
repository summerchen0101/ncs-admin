import { useOptionsContext } from '@/context/OptionsContext'
import { Col, Form, FormInstance, Input, Row, Select, Switch } from 'antd'
import React, { useEffect } from 'react'
export interface FaqFormProps {
  id?: number
  catalogue_id: number
  title: string
  content: string
  content_mobile: string
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: FaqFormProps
  form: FormInstance<FaqFormProps>
}) {
  const [categoryOpts] = useOptionsContext('faqCategory')
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  const mediaTyps = [
    { label: '網頁版內容', name: 'content' },
    { label: '手機版內容', name: 'content_mobile' },
  ]
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="標題" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="分類"
            name="catalogue_id"
            rules={[{ required: true }]}
          >
            <Select options={categoryOpts} placeholder="請選擇" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="狀態" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
      {mediaTyps.map((t, i) => (
        <Form.Item
          key={i}
          label={t.label}
          name={t.name}
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
      ))}
    </Form>
  )
}

export default FormData
