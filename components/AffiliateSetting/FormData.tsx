import { Box, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import {
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Radio,
  Row,
  Switch,
} from 'antd'
import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
import InlineFormField from '../InlineFormField'
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
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={[2]} spacingX="20px">
        <Form.Item label="阶级名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="排序" name="sort" initialValue={0}>
          <Input />
        </Form.Item>
      </SimpleGrid>
      <Form.Item label="活躍玩家數">
        <HStack>
          <Box as={Form.Item} mb="0">
            <Input placeholder="最小值" addonAfter="個" />
          </Box>
          <Text>～</Text>
          <Box as={Form.Item} mb="0">
            <Input placeholder="最大值" addonAfter="個" />
          </Box>
        </HStack>
      </Form.Item>
      <Form.Item label="會員輸贏結果">
        <HStack>
          <Box as={Form.Item} mb="0">
            <Input placeholder="最小值" addonAfter="元" />
          </Box>
          <Text>～</Text>
          <Box as={Form.Item} mb="0">
            <Input placeholder="最大值" addonAfter="元" />
          </Box>
        </HStack>
      </Form.Item>
      <SimpleGrid columns={2} spacingX="20px">
        <Form.Item label="佣金比例">
          <Input addonAfter="％" />
        </Form.Item>
        <Form.Item label="状态" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
      </SimpleGrid>
    </Form>
  )
}

export default FormData
