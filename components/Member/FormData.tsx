import { AccountingType, MemberType, RestoreType } from '@/lib/enums'
import {
  accountingTypeOpts,
  gameOpts,
  memberTypeOpts,
  playOpts,
  restoreTypeOpts,
  sectionOpts,
} from '@/lib/options'
import { BetSetting } from '@/types/api/Member'
import {
  Box,
  HStack,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { Divider, Form, FormInstance, Input, Select, Switch } from 'antd'
import React, { useEffect } from 'react'
import BatchBetSettings from './BatchBetSettings'

export type BetSettingFormProps = Record<
  string,
  Record<string, Record<string, BetSetting>>
>

export interface MemberFormProps {
  id?: number
  name: string
  acc: string
  pass: string
  member_type: MemberType
  accounting_type: AccountingType
  restore_type: RestoreType
  note: string
  // parent_id: number
  is_active: boolean
  balance: number
  bet_settings: BetSettingFormProps
}
export const paramsOpts = [
  { label: '单注上限', value: 'single_bet_limit' },
  { label: '单注下限', value: 'single_bet_least' },
  { label: '单边上限', value: 'single_side_limit' },
  { label: '单场上限', value: 'single_game_limit' },
  { label: '退水', value: 'rebate_percent' },
]

function FormData({
  data,
  form,
}: {
  data: MemberFormProps
  form: FormInstance<MemberFormProps>
}) {
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])

  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid spacingX="20px" columns={[1, 2, 3]}>
        <Form.Item
          label="會員種類"
          name="member_type"
          rules={[{ required: true }]}
        >
          <Select options={memberTypeOpts} disabled={!!data.id} />
        </Form.Item>
        <Form.Item
          label="帳務類型"
          name="accounting_type"
          rules={[{ required: true }]}
        >
          <Select options={accountingTypeOpts} disabled={!!data.id} />
        </Form.Item>
        <Form.Item label="帳號" name="acc" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="暱稱" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {!data.id && (
          <Form.Item label="密碼" name="pass" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item label="會員備註" name="note">
          <Input />
        </Form.Item>
      </SimpleGrid>
      <Form.Item label="狀態" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>

      <SimpleGrid spacingX="20px" columns={[1, 2, 3]}>
        {/* <Form.Item label="額度" name="balance">
          <Input addonAfter="300000" />
        </Form.Item> */}
        <Form.Item
          label="回復設定"
          name="restore_type"
          rules={[{ required: true }]}
        >
          <Select options={restoreTypeOpts} />
        </Form.Item>
        <Form.Item label="下注狀態" valuePropName="checked">
          <Switch defaultChecked />
        </Form.Item>
      </SimpleGrid>

      {/* 批次設定 */}
      <BatchBetSettings
        onChange={(settings) => {
          form.setFieldsValue({ bet_settings: settings })
        }}
      />
      <Tabs variant="enclosed">
        <TabList>
          {gameOpts.map((g, i) => (
            <Tab key={i}>{g.label}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {gameOpts.map((g, g_i) => (
            <TabPanel key={g_i} mx="-15px" pt="30px">
              {sectionOpts.map((s, s_i) => {
                return (
                  <Box key={`${g_i}_${s_i}`}>
                    {playOpts.map((p, p_i) => (
                      <Box key={`${g_i}_${s_i}_${p_i}`}>
                        <HStack mb="3px" fontWeight="600" fontSize="16px">
                          <Text>{g.label}</Text>
                          <Text color="teal.500">{s.label}</Text>
                          <Text color="orange.500">{p.label}</Text>
                        </HStack>
                        <SimpleGrid spacingX="20px" columns={[2, 5]}>
                          {paramsOpts.map((t, t_i) => (
                            <Form.Item
                              key={t_i}
                              label={t.label}
                              rules={[{ required: true }]}
                              name={[
                                'bet_settings',
                                g.value,
                                s.value,
                                p.value,
                                t.value,
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          ))}
                        </SimpleGrid>
                      </Box>
                    ))}
                  </Box>
                )
              })}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Form>
  )
}

export default FormData
