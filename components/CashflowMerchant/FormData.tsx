import { useOptionsContext } from '@/context/OptionsContext'
import {
  Box,
  Checkbox,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Divider, Form, FormInstance, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
export interface CashflowMerchantFormProps {
  id?: number
  sort: number
  name: string
  note: string
  prefix: string
  merchant_id: string
  hash_key: string
  hash_iv: string
  base_url: string
  deposit_return_url: string
  withdraw_return_url: string
  withdraw_fee: number
  withdraw_fee_percent: number
  withdraw_limit_day: number
  withdraw_limit_week: number
  withdraw_limit_mon: number
  sys_code: string
  group_code: string
  gateways?: number[]
  is_active: boolean
}

const paywayOpts = [
  { label: '信用卡', value: 1 },
  { label: 'ATM', value: 2 },
]

const paramsOpts = [
  { label: '单次储值下限', value: 1 },
  { label: '单次储值上限', value: 2 },
  { label: '手续费', value: 3 },
]

function FormData({
  data,
  form,
}: {
  data: CashflowMerchantFormProps
  form: FormInstance<CashflowMerchantFormProps>
}) {
  const [thirdPartyOpts] = useOptionsContext().thirdParty
  const [cahflowGroupOpts] = useOptionsContext().cashflowGroup
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={[1, 2]} spacingX="20px">
        <Box>
          <Divider orientation="left">基本设置</Divider>
          <SimpleGrid columns={[1]} spacingX="20px">
            <Form.Item label="名称" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="备注" name="note">
              <Input />
            </Form.Item>
            <Form.Item label="排序" name="sort" initialValue={0}>
              <Input />
            </Form.Item>

            <Form.Item label="前缀" name="prefix">
              <Input />
            </Form.Item>
            <Form.Item label="基础网址" name="base_url">
              <Input />
            </Form.Item>
            <Form.Item
              label="金流商"
              name="sys_code"
              rules={[{ required: true }]}
              initialValue={1}
            >
              <Select options={thirdPartyOpts} />
            </Form.Item>
            <Form.Item label="轮替群组" name="group_code">
              <Select options={cahflowGroupOpts} placeholder="请选择" />
            </Form.Item>
          </SimpleGrid>
        </Box>
        <Box>
          <Divider orientation="left">金流设置值</Divider>
          <SimpleGrid columns={[1]} spacingX="20px">
            <Form.Item
              label="特店编号"
              name="merchant_id"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Hash Key"
              name="hash_key"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Hash IV"
              name="hash_iv"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="储值完成导向" name="deposit_return_url">
              <Input />
            </Form.Item>
            <Form.Item label="提领完成导向" name="withdraw_return_url">
              <Input />
            </Form.Item>
            <Form.Item label="提领手续费" name="withdraw_fee">
              <Input />
            </Form.Item>
            <Form.Item label="提领手续费%" name="withdraw_fee_percent">
              <Input />
            </Form.Item>
          </SimpleGrid>
        </Box>
      </SimpleGrid>

      <Divider orientation="left">轮替条件</Divider>
      <SimpleGrid columns={[1, 3]} spacingX="20px">
        <Form.Item label="日提领金额上限" name="withdraw_limit_day">
          <Input />
        </Form.Item>
        <Form.Item label="週提领金额上限" name="withdraw_limit_week">
          <Input />
        </Form.Item>
        <Form.Item label="月提领金额上限" name="withdraw_limit_mon">
          <Input />
        </Form.Item>
        <Form.Item label="日储值金额上限" name="max">
          <Input />
        </Form.Item>
        <Form.Item label="日储值次数上限" name="max">
          <Input />
        </Form.Item>
        <Form.Item label="总入点金额上限" name="max">
          <Input />
        </Form.Item>
      </SimpleGrid>
      <Divider orientation="left">允许支付方式</Divider>
      <Stack spacing="20px">
        {paywayOpts.map((t) => (
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
