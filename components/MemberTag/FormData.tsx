import { Form, FormInstance, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  CirclePicker,
  ColorResult,
  CompactPicker,
  SketchPicker,
} from 'react-color'
import ColorPicker from '../ColorPicker'
export interface MemberTagFormProps {
  id?: number
  name: string
  color: string
  content: string
}

function FormData({
  data,
  form,
}: {
  data: MemberTagFormProps
  form: FormInstance<MemberTagFormProps>
}) {
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="標籤名稱" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="顏色" name="color" rules={[{ required: true }]}>
        <ColorPicker />
      </Form.Item>
      <Form.Item label="說明" name="content" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
    </Form>
  )
}

export default FormData
