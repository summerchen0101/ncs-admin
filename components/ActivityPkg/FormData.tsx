import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Box, HStack, SimpleGrid, Stack } from '@chakra-ui/react'
import {
  Button,
  Checkbox,
  Collapse,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Radio,
  Select,
} from 'antd'
import moment, { Moment } from 'moment'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import ImageUpload from '../ImageUpload'
import InlineFormField from '../InlineFormField'

const ContentEditor = dynamic(() => import('@/components/ContentEditor'), {
  ssr: false,
})
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
  const [type, setType] = useState('single')
  const disabledDate = (current) => {
    return current && current < moment().startOf('day')
  }
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="行销活动名称" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="活动期间" name="date_range_type">
        <Stack as={Radio.Group} direction={['column', 'row']} spacing="12px">
          <Radio value="forever">无限期</Radio>
          <Radio value="limit">
            <InlineFormField name="limit_range" w={['auto', 'auto']} noStyle>
              <DatePicker.RangePicker disabledDate={disabledDate} />
            </InlineFormField>
          </Radio>
        </Stack>
      </Form.Item>
      <SimpleGrid columns={2} spacing="20px">
        <Form.Item label="活动类型" name="activity_type" initialValue="single">
          <Radio.Group onChange={(e) => setType(e.target.value)}>
            <Radio value="single">单一活动</Radio>
            <Radio value="multiple">过关活动</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="报名人数上限"
          name="activity_type"
          initialValue="single"
        >
          <Input addonAfter="人" />
        </Form.Item>
      </SimpleGrid>
      <Form.Item label="会员级别限定" name="member_level" initialValue="single">
        <Checkbox.Group
          options={[
            { label: 'VIP1', value: 1 },
            { label: 'VIP2', value: 2 },
          ]}
        />
      </Form.Item>

      {type === 'single' ? (
        <Form.Item label="活动选择">
          <Form.Item
            name={['activity', 'name']}
            rules={[{ required: true }]}
            noStyle
          >
            <Select
              options={[{ label: '首储1000送500', value: 1 }]}
              placeholder="请选择活动"
            />
          </Form.Item>
        </Form.Item>
      ) : (
        <Form.Item label="活动完成顺序 (排序 / 活动选择)">
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <Stack spacing="12px">
                {fields.map((field, index) => (
                  <HStack key={field.key}>
                    <Box w="100px">
                      <Form.Item
                        {...field}
                        noStyle
                        name={[field.name, 'last']}
                        fieldKey={[field.fieldKey, 'last']}
                        rules={[
                          { required: true, message: 'Missing last name' },
                        ]}
                        initialValue={index + 1}
                      >
                        <Input placeholder="排序" />
                      </Form.Item>
                    </Box>
                    <Form.Item
                      {...field}
                      name={[field.name, 'first']}
                      fieldKey={[field.fieldKey, 'first']}
                      rules={[{ required: true }]}
                      noStyle
                    >
                      <Select
                        options={[{ label: '首储1000送500', value: 1 }]}
                        placeholder="请选择活动"
                      />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </HStack>
                ))}
                <Form.Item noStyle>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    新增活动
                  </Button>
                </Form.Item>
              </Stack>
            )}
          </Form.List>
        </Form.Item>
      )}

      <Collapse defaultActiveKey={['1']} accordion>
        <Collapse.Panel header="手机版行销" key="1">
          <Form.Item label="广告图片" name="img_mobile">
            <ImageUpload />
          </Form.Item>
          <Form.Item label="活动内容" name="content_mobile">
            <ContentEditor />
          </Form.Item>
        </Collapse.Panel>
        <Collapse.Panel header="桌机版行销" key="2">
          <Form.Item label="广告图片" name="img">
            <ImageUpload />
          </Form.Item>
          <Form.Item label="活动内容" name="content">
            <ContentEditor />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </Form>
  )
}

export default FormData
