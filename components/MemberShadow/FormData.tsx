import { useOptionsContext } from '@/context/OptionsContext'
import useValidator from '@/utils/useValidator'
import { Form, FormInstance, Input, Select, Switch, Col, Row } from 'antd'
import React, { useEffect } from 'react'
export interface SubAccFormProps {
  id?: number
  acc: string
  pass?: string
  pass_c?: string
  name: string
  note: string
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: SubAccFormProps
  form: FormInstance<SubAccFormProps>
}) {
  const VD = useValidator()
  return (
    <Form
      layout="vertical"
      validateTrigger="onBlur"
      form={form}
      initialValues={data}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="帳號"
            name="acc"
            rules={[
              { required: true },
              { pattern: /^\w{4,12}$/, message: '4~12個英數字' },
            ]}
          >
            <Input disabled={!!data.id} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="暱稱"
            name="name"
            rules={[{ required: true }, { max: 30 }]}
          >
            <Input />
          </Form.Item>
        </Col>
        {!data.id && (
          <>
            <Col span={12}>
              <Form.Item
                label="密碼"
                name="pass"
                rules={[{ required: true }, VD.userPassword]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="確認密碼"
                name="pass_c"
                rules={[{ required: true }, VD.sameAs('pass')]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </>
        )}

        <Col span={24}>
          <Form.Item label="備註" name="note">
            <Input />
          </Form.Item>
        </Col>
        <Form.Item label="狀態" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Row>
    </Form>
  )
}

export default FormData
