import { useOptionsContext } from '@/context/OptionsContext'
import { paymentTypeOpts } from '@/lib/options'
import { PaymentGateway } from '@/types/api/PaymentGateway'
import { MinusIcon } from '@chakra-ui/icons'
import {
  Box,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import {
  Button,
  Checkbox,
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Select,
  Switch,
} from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi'

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
  is_active: boolean
  gateways?: PaymentGateway[]
}

const paramsOpts = [
  { label: '单次储值下限', value: 'single_deposit_least' },
  { label: '单次储值上限', value: 'single_deposit_limit' },
  { label: '手续费', value: 'deposit_fee' },
  { label: '手续费%', value: 'deposit_fee_percent' },
  { label: '日储值上限', value: 'deposit_limit_day' },
  { label: '週储值上限', value: 'deposit_limit_week' },
  { label: '月储值上限', value: 'deposit_limit_mon' },
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
      <SimpleGrid columns={[1, 3]} spacingX="20px">
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="备注" name="note">
          <Input />
        </Form.Item>
        <Form.Item label="排序" name="sort" initialValue={0}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        {/* <Spacer /> */}

        <Form.Item label="前缀" name="prefix">
          <Input />
        </Form.Item>
        <Form.Item label="基础网址" name="base_url">
          <Input />
        </Form.Item>
        <Form.Item label="啟用" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
      </SimpleGrid>

      <Divider orientation="left">金流设置值</Divider>
      <SimpleGrid columns={[1, 4]} spacingX="20px">
        <Form.Item
          label="金流商"
          name="sys_code"
          rules={[{ required: true }]}
          initialValue={1}
        >
          <Select options={thirdPartyOpts} />
        </Form.Item>
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
        <Form.Item label="Hash IV" name="hash_iv" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="储值回调连结" name="deposit_return_url">
          <Input />
        </Form.Item>
        <Form.Item label="提领回调连结" name="withdraw_return_url">
          <Input />
        </Form.Item>
        <Form.Item label="提领手续费" name="withdraw_fee">
          <Input />
        </Form.Item>
        <Form.Item label="提领手续费%" name="withdraw_fee_percent">
          <Input />
        </Form.Item>
      </SimpleGrid>

      <Divider orientation="left">轮替条件</Divider>
      <SimpleGrid columns={[1, 4]} spacingX="20px">
        <Form.Item label="轮替群组" name="group_code">
          <Select options={cahflowGroupOpts} placeholder="请选择" />
        </Form.Item>
        <Form.Item label="日提领金额上限" name="withdraw_limit_day">
          <Input />
        </Form.Item>
        <Form.Item label="週提领金额上限" name="withdraw_limit_week">
          <Input />
        </Form.Item>
        <Form.Item label="月提领金额上限" name="withdraw_limit_mon">
          <Input />
        </Form.Item>
      </SimpleGrid>
      {!data.id && (
        <>
          <Divider orientation="left">允许支付方式</Divider>
          <Stack
            spacing="23px"
            divider={<StackDivider borderColor="gray.200" />}
          >
            <Form.List name="gateways">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Stack
                      key={key}
                      direction={['column', 'row']}
                      align={['initial', 'center']}
                      spacing="10px"
                    >
                      <SimpleGrid columns={4} spacingX="20px">
                        <Form.Item
                          label="支付方式"
                          {...restField}
                          name={[name, 'payment_type']}
                          fieldKey={[fieldKey, 'payment_type']}
                        >
                          <Select options={paymentTypeOpts} />
                        </Form.Item>
                        {paramsOpts.map((t) => (
                          <Form.Item
                            key={t.value}
                            label={t.label}
                            {...restField}
                            name={[name, t.value]}
                            fieldKey={[fieldKey, t.value]}
                          >
                            <Input />
                          </Form.Item>
                        ))}
                      </SimpleGrid>
                      <BiMinusCircle
                        fontSize="18px"
                        onClick={() => remove(name)}
                      />
                    </Stack>
                  ))}
                  <Form.Item>
                    <Button type="primary" onClick={() => add()} block>
                      新增支付方式
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Stack>
        </>
      )}
    </Form>
  )
}

export default FormData
