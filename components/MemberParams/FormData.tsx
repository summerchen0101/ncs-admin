import { gameOpts, sectionOpts } from '@/lib/options'
import { Box, SimpleGrid, Spacer, Text } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { Button, Divider, Form, Input, Select, Switch } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useEffect } from 'react'
export interface MemberParamsFormProps {
  balance?: number
}

const paramsOpts = [
  { label: '單注上限', value: 1 },
  { label: '單隊上限', value: 2 },
  { label: '單場上限', value: 3 },
  { label: '退水', value: 4 },
]

function FormData() {
  const [form] = useForm<MemberParamsFormProps>()
  const data = {
    balance: 1000,
  }
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  return (
    <Box maxW="800px">
      <Form layout="vertical" form={form} initialValues={data}>
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
        <Divider orientation="left">快速設定</Divider>
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
          <Form.Item label="單注上限">
            <Input />
          </Form.Item>
          <Form.Item label="單隊上限">
            <Input />
          </Form.Item>
          <Form.Item label="單場上限">
            <Input />
          </Form.Item>
          <Form.Item label="退水">
            <Input />
          </Form.Item>
        </SimpleGrid>
        <Box mb="40px">
          <Button type="primary">確認送出</Button>
        </Box>
        <Divider orientation="left">設定方式(一)</Divider>
        <Tabs mx="-15px">
          <TabList>
            {gameOpts.map((g, i) => (
              <Tab key={i}>{g.label}</Tab>
            ))}
          </TabList>

          <TabPanels>
            {gameOpts.map((g, g_i) => (
              <TabPanel key={g_i}>
                {sectionOpts.map((s, s_i) => {
                  return (
                    <Box key={`${g_i}_${s_i}`}>
                      <Text mb="10px" fontWeight="600">
                        {g.label}-{s.label}
                      </Text>
                      <SimpleGrid spacingX="20px" columns={[2, 4]}>
                        <Form.Item label="單注上限">
                          <Input />
                        </Form.Item>
                        <Form.Item label="單隊上限">
                          <Input />
                        </Form.Item>
                        <Form.Item label="單場上限">
                          <Input />
                        </Form.Item>
                        <Form.Item label="退水">
                          <Input />
                        </Form.Item>
                      </SimpleGrid>
                    </Box>
                  )
                })}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>

        <Divider orientation="left">設定方式(二)</Divider>
        {paramsOpts.map((p, p_i) => (
          <Box key={p_i}>
            <Text mb="10px" fontWeight="600">
              {p.label}
            </Text>
            <SimpleGrid spacingX="20px" columns={[1, 2, 5]}>
              {gameOpts.map((g, g_i) => {
                return sectionOpts.map((s, s_i) => {
                  return (
                    <Form.Item
                      label={`${g.label}${s.label}`}
                      key={`${g_i}_${s_i}`}
                    >
                      <Input />
                    </Form.Item>
                  )
                })
              })}
              <Form.Item label="快速設定">
                <Box as={Input} bgColor="yellow.100" />
              </Form.Item>
            </SimpleGrid>
          </Box>
        ))}
        <Divider orientation="left">設定方式(三)</Divider>
        <SimpleGrid
          spacingX={[0, '60px']}
          spacingY={[0, '30px']}
          columns={[1, 2]}
        >
          {paramsOpts.map((p, p_i) => (
            <Box key={p_i}>
              <Text mb="10px" fontWeight="600" color="blue.500">
                {p.label}
              </Text>

              <SimpleGrid spacingX="20px" columns={[2]}>
                {gameOpts.map((g, g_i) => {
                  return sectionOpts.map((s, s_i) => {
                    return (
                      <Form.Item
                        label={`${g.label}-${s.label}`}
                        key={`${g_i}_${s_i}`}
                      >
                        <Input />
                      </Form.Item>
                    )
                  })
                })}
                <Form.Item label="快速設定">
                  <Box as={Input} bgColor="yellow.100" />
                </Form.Item>
              </SimpleGrid>
            </Box>
          ))}
        </SimpleGrid>
      </Form>
    </Box>
  )
}

export default FormData
