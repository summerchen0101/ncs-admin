import { SimpleGrid } from '@chakra-ui/layout'
import { Divider, Form, FormInstance, Input, Select } from 'antd'
import React from 'react'
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
      <SimpleGrid columns={2} spacingX="20px">
        <Form.Item label="级别名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="金流群组"
          name="group"
          rules={[{ required: true }]}
          initialValue={1}
        >
          <Select
            options={[
              { label: '默认', value: 1 },
              { label: '风控', value: 2 },
            ]}
          />
        </Form.Item>
      </SimpleGrid>
      <Divider orientation="left">套用条件</Divider>
      <SimpleGrid columns={2} spacingX="20px">
        <Form.Item
          label="累计流水量"
          name="amount"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="推荐会员数"
          name="member"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </SimpleGrid>
      <Divider orientation="left">出金条件</Divider>
      <SimpleGrid columns={2} spacingX="20px">
        <Form.Item
          label="累计流水量"
          name="amount"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="出金手续费%" name="fee" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="单笔出金下限"
          name="single_least"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="单笔出金上限"
          name="single_limit"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </SimpleGrid>
    </Form>
  )
}

export default FormData
