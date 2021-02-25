import {
  AccountingType,
  MemberType,
  Play,
  RestoreType,
  Section,
  SportGame,
} from '@/lib/enums'
import {
  accountingTypeOpts,
  gameOpts,
  memberTypeOpts,
  playOpts,
  restoreTypeOpts,
  sectionOpts,
} from '@/lib/options'
import { BetSetting } from '@/types/api/Member'
import { Box, HStack, SimpleGrid, Spacer, Text } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import {
  Button,
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Switch,
} from 'antd'
import React, { useEffect, useMemo } from 'react'

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
const paramsOpts = [
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

        <Divider orientation="left">游戏参数设定</Divider>
        <SimpleGrid spacingX="20px" columns={[1, 2, 3]}>
          <Form.Item label="額度" name="balance">
            <Input addonAfter="300000" />
          </Form.Item>
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

        <Tabs variant="enclosed">
          <TabList>
            {gameOpts.map((g, i) => (
              <Tab key={i}>{g.label}</Tab>
            ))}
          </TabList>

          <TabPanels>
            {gameOpts.map((g, g_i) => (
              <TabPanel key={g_i} mx="-15px" pt="30px">
                <Box>
                  {/* <Text mb="10px" fontWeight="600">
                    批次設定
                  </Text> */}
                  <SimpleGrid spacingX="20px" columns={[2, 5]}>
                    {paramsOpts.map((p, p_i) => (
                      <Form.Item key={p_i} label={p.label}>
                        <Box
                          as={Input}
                          bgColor="yellow.100"
                          placeholder="快速設定"
                        />
                      </Form.Item>
                    ))}
                  </SimpleGrid>
                </Box>
                {sectionOpts.map((s, s_i) => {
                  return (
                    <Box
                      key={`${g_i}_${s_i}`}
                      pt="18px"
                      borderTop="1px solid  #eee"
                    >
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
        <Box>
          <Divider orientation="left">批次設定</Divider>
          <SimpleGrid spacingX="20px" columns={[1, 2]}>
            <Form.Item label="球種">
              <Select
                mode="multiple"
                defaultValue={gameOpts.map((t) => t.value)}
                options={gameOpts}
              />
            </Form.Item>
            <Form.Item label="場次">
              <Select
                mode="multiple"
                defaultValue={sectionOpts.map((t) => t.value)}
                options={sectionOpts}
              />
            </Form.Item>
          </SimpleGrid>
          <SimpleGrid spacingX="20px" columns={[2, 5]}>
            {paramsOpts.map((p, p_i) => (
              <Form.Item key={p_i} label={p.label}>
                <Box as={Input} bgColor="yellow.100" placeholder="快速設定" />
              </Form.Item>
            ))}
          </SimpleGrid>
          <Box as={Button} bgColor="orange.500" color="#fff">
            快速設定
          </Box>
        </Box>
      </Form>
    </Form>
  )
}

export default FormData
