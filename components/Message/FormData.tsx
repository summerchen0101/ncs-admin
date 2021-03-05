import { MemberType } from '@/lib/enums'
import {} from '@chakra-ui/react'
import { Form, FormInstance, Input, Radio, Select } from 'antd'
import React, { useEffect } from 'react'
export interface MessageFormProps {
  id?: number
  title: string
  content: string
  receivers: string[]
  member_type: MemberType
  is_all: boolean
}

function FormData({
  data,
  form,
}: {
  data: MessageFormProps
  form: FormInstance<MessageFormProps>
}) {

  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="標題" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="內容" name="content" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="收件人身份"
        name="member_type"
        initialValue={MemberType.Member}
      >
        <Radio.Group>
          <Radio value={MemberType.Member}>會員</Radio>
          <Radio value={MemberType.Agent}>代理</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="收件人帳號" name="receivers">
        <Select
          mode="tags"
          tokenSeparators={[',']}
          placeholder="全部帳號"
          allowClear
        />
      </Form.Item>
    </Form>
  )
}

export default FormData
