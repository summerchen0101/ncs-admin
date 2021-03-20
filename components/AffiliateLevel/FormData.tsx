import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Form, FormInstance, Input, InputNumber, Switch } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
export interface AffiliateLevelFormProps {
  id?: number
  level: number
  name: string
  active_member_count: number
  profit_min: number
  profit_max: number
  profit_percent: number
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: AffiliateLevelFormProps
  form: FormInstance<AffiliateLevelFormProps>
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
        <Form.Item label="等级" name="level" initialValue={0}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="活跃玩家数" name="active_member_count">
          <Input addonAfter="个" />
        </Form.Item>
      </SimpleGrid>

      <Form.Item label="会员输赢结果">
        <HStack>
          <Box as={Form.Item} mb="0" name="profit_min">
            <Input placeholder="最小值" addonAfter="元" />
          </Box>
          <Text>～</Text>
          <Box as={Form.Item} mb="0" name="profit_max">
            <Input placeholder="最大值" addonAfter="元" />
          </Box>
        </HStack>
      </Form.Item>
      <SimpleGrid columns={2} spacingX="20px">
        <Form.Item label="佣金比例" name="profit_percent">
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
