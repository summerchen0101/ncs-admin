import { AccountingType, MemberType } from '@/lib/enums'
import {
  accountingTypeOpts,
  gameOpts,
  memberTypeOpts,
  sectionOpts,
} from '@/lib/options'
import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { Affix, Button, Divider, Form, Input, Select, Switch } from 'antd'
import { FormInstance } from 'antd/lib/form/Form'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'
export interface MemberFormProps {
  id?: number
  name: string
  acc: string
  pass: string
  member_type: MemberType
  accounting_type: AccountingType
  // parent_id: number
  is_active: boolean
}

const paramsOpts = [
  { label: '單注上限', value: 1 },
  { label: '單隊上限', value: 2 },
  { label: '單場上限', value: 3 },
  { label: '退水', value: 4 },
]

function ParamsForm({
  data,
  form,
}: {
  data: MemberFormProps
  form: FormInstance<MemberFormProps>
}) {
  return (
    <Box maxW="800px" pb="30px">
      <Form layout="vertical" form={form} initialValues={data}>
        <SimpleGrid spacingX="20px" columns={[1, 2, 3]}>
          <Form.Item label="會員種類" name="member_type">
            <Select options={memberTypeOpts} disabled={!!data.id} />
          </Form.Item>
          <Form.Item label="帳務類型" name="accounting_type">
            <Select options={accountingTypeOpts} disabled={!!data.id} />
          </Form.Item>
          <Form.Item label="帳號" name="acc">
            <Input />
          </Form.Item>
          <Form.Item label="暱稱" name="name">
            <Input />
          </Form.Item>
          {!data.id && (
            <Form.Item label="密碼" name="pass">
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item label="狀態" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </SimpleGrid>
        <Divider orientation="left">遊戲參數設定</Divider>
        <SimpleGrid spacingX="20px" columns={[1, 2, 3]}>
          <Form.Item label="額度">
            <Input addonAfter="300000" />
          </Form.Item>
          <Form.Item label="回復設定">
            <Select
              defaultValue={1}
              options={[
                { label: '每日中午12點', value: 1 },
                { label: '每週日中午12點', value: 2 },
              ]}
            />
          </Form.Item>
          <Form.Item label="單注下限">
            <Input />
          </Form.Item>
          <Form.Item label="下注狀態" valuePropName="checked">
            <Switch defaultChecked />
          </Form.Item>
        </SimpleGrid>

        <Tabs bgColor="#fff" shadow="sm">
          <TabList>
            {gameOpts.map((g, i) => (
              <Tab key={i}>{g.label}</Tab>
            ))}
          </TabList>

          <TabPanels>
            {gameOpts.map((g, g_i) => (
              <TabPanel key={g_i}>
                <Box>
                  {/* <Text mb="10px" fontWeight="600">
                    批次設定
                  </Text> */}
                  <SimpleGrid spacingX="20px" columns={[2, 4]}>
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
                    <Box key={`${g_i}_${s_i}`}>
                      <Text mb="10px" fontWeight="600">
                        {g.label}-{s.label}
                      </Text>
                      <SimpleGrid spacingX="20px" columns={[2, 4]}>
                        {paramsOpts.map((p, p_i) => (
                          <Form.Item key={p_i} label={p.label}>
                            <Input />
                          </Form.Item>
                        ))}
                      </SimpleGrid>
                    </Box>
                  )
                })}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        <Box my="40px">
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
          <SimpleGrid spacingX="20px" columns={[2, 4]}>
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
    </Box>
  )
}

export default ParamsForm
