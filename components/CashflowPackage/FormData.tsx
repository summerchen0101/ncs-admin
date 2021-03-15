import {
  Box,
  Checkbox,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Divider, Form, FormInstance, Input, Select } from 'antd'
import moment, { Moment } from 'moment'
import React from 'react'
export interface MarqueeFormProps {
  id?: number
  content: string
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
  data: MarqueeFormProps
  form: FormInstance<MarqueeFormProps>
}) {
  const disabledDate = (current) => {
    return current && current < moment().startOf('day')
  }
  const paywaryOpts = [
    { label: '信用卡', value: 1 },
    { label: 'ATM', value: 2 },
  ]

  const paramsOpts = [
    { label: '单次储值下限', value: 1 },
    { label: '单次储值上限', value: 2 },
    { label: '手续费', value: 3 },
  ]
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={[1, 2]} spacingX="20px">
        <Box>
          <Divider orientation="left">基本设置</Divider>

          <Form.Item label="名称" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="备注" name="note">
            <Input />
          </Form.Item>
          <Form.Item label="排序" name="sort" initialValue={0}>
            <Input />
          </Form.Item>
        </Box>
        <Box>
          <Divider orientation="left">金流设置值</Divider>
          <Form.Item
            label="金流商"
            name="cashflow"
            rules={[{ required: true }]}
            initialValue={1}
          >
            <Select options={[{ label: '绿界', value: 1 }]} />
          </Form.Item>
          <Form.Item label="特店编号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Hash Key" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Hash IV" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Box>
      </SimpleGrid>

      <Divider orientation="left">轮替條件</Divider>
      <SimpleGrid columns={[2, 4]} spacingX="20px">
        <Form.Item label="轮替群组">
          <Select
            options={[
              { label: '默认', value: 1 },
              { label: '风控', value: 2 },
            ]}
            defaultValue={1}
          />
        </Form.Item>
        <Form.Item label="每日金额上限" name="max">
          <Input />
        </Form.Item>
        <Form.Item label="每日次數上限" name="max">
          <Input />
        </Form.Item>
        <Form.Item label="總入点金额上限" name="max">
          <Input />
        </Form.Item>
      </SimpleGrid>
      <Divider orientation="left">允许支付方式</Divider>
      <Stack spacing="20px">
        {paywaryOpts.map((t) => (
          <Stack
            key={t.value}
            direction={['column', 'row']}
            align={['initial', 'center']}
            spacing="10px"
          >
            <HStack as="label" minW="100px">
              <Form.Item noStyle>
                <Checkbox size="lg" colorScheme="brand" />
              </Form.Item>
              <Text whiteSpace="nowrap" fontSize="18px" fontWeight="600">
                {t.label}
              </Text>
            </HStack>
            {paramsOpts.map((t) => (
              <Stack
                key={t.value}
                as="label"
                direction={['column', 'row']}
                align={['initial', 'center']}
              >
                <Text whiteSpace="nowrap">{t.label}</Text>
                <Form.Item noStyle>
                  <Input />
                </Form.Item>
              </Stack>
            ))}
          </Stack>
        ))}
      </Stack>
    </Form>
  )
}

export default FormData
