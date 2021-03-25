import {
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { DatePicker, Form, FormInstance, Input, Radio, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import InlineFormField from '../InlineFormField'
import BetSumTimes from './BetSumTimes'
import ContinueLogin from './ContinueLogin'
import RechargeForm from './rechargeForm'

const activityTypeOpts = [
  { label: '储值金額', value: 2, componet: RechargeForm },
  { label: '洗码量', value: 4, componet: BetSumTimes },
  { label: '连续登录', value: 8, componet: ContinueLogin },
]

export interface ActivityFormProps {
  id?: number
  title: string
  content: string
  date_range_type: string
  limit_range: [Moment, Moment]
  is_active: boolean
  content_mobile: string
  img: string
  img_mobile: string
  bonus: number
}

function FormData({
  data,
  form,
}: {
  data: ActivityFormProps
  form: FormInstance<ActivityFormProps>
}) {
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form form={form} initialValues={data} layout="vertical">
      <Form.Item
        label="活动名称"
        name="title"
        rules={[{ required: true, max: 60 }]}
      >
        <Input placeholder="请输入内容" />
      </Form.Item>
      <SimpleGrid columns={[1, 2]} spacingX="30px">
        <Form.Item label="审核方式">
          <Select
            options={[
              { label: '自动审核', value: 1 },
              { label: '人工审核', value: 2 },
            ]}
            defaultValue={1}
          />
        </Form.Item>
        <Form.Item label="礼金派发方式">
          <Select
            options={[
              { label: '自动派发', value: 1 },
              { label: '人工派发', value: 2 },
            ]}
            defaultValue={1}
          />
        </Form.Item>

        {/* <Form.Item label="活动类型" name="type">
          <Select
            options={activityTypeOpts}
            placeholder="请选择"
          />
        </Form.Item> */}
      </SimpleGrid>
      <Form.Item label="活动时间" name="date_range_type">
        <Stack as={Radio.Group} direction={['column', 'row']} spacing="12px">
          <Radio value="forever">无限期</Radio>
          <Radio value="limit">
            <InlineFormField noStyle name="limit_range" w={['auto', 'auto']}>
              <DatePicker.RangePicker />
            </InlineFormField>
          </Radio>
        </Stack>
      </Form.Item>
      {/* <Form.Item label="结算週期" name="date_range_type">
        <Stack as={Radio.Group} direction={['column', 'row']} spacing="12px">
          <Radio value="1">活动结束时</Radio>
          <Radio value="2">
            <InlineFormField noStyle>
              <TimePicker use12Hours format="h:mm a" showNow={false} />
            </InlineFormField>
          </Radio>
        </Stack>
      </Form.Item> */}
      <Tabs variant="soft-rounded" colorScheme="red">
        <TabList flexWrap="wrap" mb="10px">
          {activityTypeOpts.map((t) => (
            <Tab
              key={t.value}
              fontSize="sm"
              py="5px"
              px="10px"
              borderRadius="sm"
              _focus={{}}
            >
              {t.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {activityTypeOpts.map((t) => (
            <TabPanel key={t.value} px="10px">
              <t.componet />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Form>
  )
}

export default FormData
