import { SimpleGrid } from '@chakra-ui/layout'
import { Divider, Form, FormInstance, Input, Select } from 'antd'
import React, { useEffect } from 'react'
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
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={3} spacingX="20px">
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
      <SimpleGrid columns={3} spacingX="20px">
        <Form.Item
          label="累计流水量"
          name="amount"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="累计储值金"
          name="deposit"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="保级流水" name="hold" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </SimpleGrid>
      <Divider orientation="left">提款相关</Divider>
      <SimpleGrid columns={3} spacingX="20px">
        <Form.Item
          label="单笔出金上限"
          name="single_limit"
          rules={[{ required: true }]}
        >
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
          label="提领额度(日)"
          name="fee_daliy_limit"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="手续费"
          name="fee_percent"
          rules={[{ required: true }]}
        >
          <Input addonAfter="%" />
        </Form.Item>
        {/* <Form.Item label="手续费(元)" name="fee" rules={[{ required: true }]}>
          <Input />
        </Form.Item> */}
        <Form.Item
          label="免手续费(日)"
          name="fee_free_times"
          rules={[{ required: true }]}
        >
          <Input addonAfter="次" />
        </Form.Item>
      </SimpleGrid>
      <Divider orientation="left">专属礼包</Divider>
      <SimpleGrid columns={3} spacingX="20px">
        <Form.Item
          label="生日礼金"
          name="birth_gift"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="升级礼金"
          name="birth_gift"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="每月红包"
          name="birth_gift"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </SimpleGrid>
    </Form>
  )
}

export default FormData
