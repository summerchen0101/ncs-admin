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
      <Form.Item label="標題" name="title">
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="分類" name="catalogue_id">
            <Select options={categoryOpts} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="狀態" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
      {mediaTyps.map((t, i) => (
        <Form.Item key={i} label={t.label} name={t.name}>
          <Input.TextArea />
        </Form.Item>
      ))}
    </Form>
  )
}

export default FormData
