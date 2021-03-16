import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import {
  Col,
  DatePicker,
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
} from 'antd'
import { Moment } from 'moment'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
// import ContentEditor from '../ContentEditor'
import ImageUpload from '../ImageUpload'
import InlineFormField from '../InlineFormField'

const ContentEditor = dynamic(() => import('@/components/ContentEditor'), {
  ssr: false,
})

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
  // const disabledDate = (current) => {
  //   return current && current < moment().startOf('day')
  // }

  const mediaTyps = [
    { label: '网页版内容', content: 'content', img: 'img' },
    { label: '手机版内容', content: 'content_mobile', img: 'img_mobile' },
  ]
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form form={form} initialValues={data} layout="vertical">
      <SimpleGrid columns={2} spacingX="20px">
        <Form.Item
          label="活动名称"
          name="title"
          rules={[{ required: true, max: 60 }]}
        >
          <Input placeholder="请输入内容" />
        </Form.Item>
        <Form.Item label="活动类型" name="type">
          <Select
            options={[
              { label: '首次储值', value: 1 },
              { label: '再次储值', value: 2 },
              { label: '累计储值', value: 3 },
              { label: '累计洗码量', value: 4 },
              { label: '推荐会员数', value: 5 },
              { label: '累计输额', value: 6 },
              { label: '累计登录', value: 7 },
              { label: '连续登录', value: 8 },
              { label: '生日礼金', value: 9 },
            ]}
            placeholder="请选择"
          />
        </Form.Item>
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
      </SimpleGrid>
      <Divider orientation="left">储值类礼金规则</Divider>
      <SimpleGrid columns={2} spacingX="20px">
        <Form.Item label="储值点数" name="point">
          <Input />
        </Form.Item>
        <Form.Item label="礼金上限" name="limit">
          <Input />
        </Form.Item>
      </SimpleGrid>
      <Form.Item label="计算类型">
        <Stack
          as={Radio.Group}
          direction={['column', 'row']}
          spacing="12px"
          defaultValue={1}
        >
          <Radio value={1}>
            <InlineFormField label="固定">
              <Input addonAfter="点" />
            </InlineFormField>
          </Radio>
          <Radio value={2}>
            <InlineFormField label="按比例">
              <Input addonBefore="点数 x" addonAfter="％" />
            </InlineFormField>
          </Radio>
        </Stack>
      </Form.Item>
      <Form.Item label="期间" name="date_range_type">
        <Stack as={Radio.Group} direction={['column', 'row']} spacing="12px">
          <Radio value="forever">无限期</Radio>
          <Radio value="limit">
            <InlineFormField name="limit_range" w={['auto', 'auto']}>
              <DatePicker.RangePicker />
            </InlineFormField>
          </Radio>
        </Stack>
      </Form.Item>
    </Form>
  )
}

export default FormData
