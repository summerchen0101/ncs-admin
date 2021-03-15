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
  const [categoryOpts] = useOptionsContext().faqCategory

  const mediaTyps = [
    { label: '网页版内容', name: 'content' },
    { label: '手机版内容', name: 'content_mobile' },
  ]
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="标题" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="分类"
            name="catalogue_id"
            rules={[{ required: true }]}
          >
            <Select options={categoryOpts} placeholder="请选择" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="状态" name="is_active" valuePropName="checked">
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
