import { Box, HStack, SimpleGrid, Stack } from '@chakra-ui/react'
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Switch,
} from 'antd'
import { Option } from 'antd/lib/mentions'
import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from 'react-icons/hi'
import ContentEditor from '../ContentEditor'
import ImageUpload from '../ImageUpload'
import InlineFormField from '../InlineFormField'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
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
  const disabledDate = (current) => {
    return current && current < moment().startOf('day')
  }
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="行销组合名称" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="活动期间" name="date_range_type">
        <Stack as={Radio.Group} direction={['column', 'row']} spacing="12px">
          <Radio value="forever">无限期</Radio>
          <Radio value="limit">
            <InlineFormField name="limit_range" w={['auto', 'auto']}>
              <DatePicker.RangePicker disabledDate={disabledDate} />
            </InlineFormField>
          </Radio>
        </Stack>
      </Form.Item>

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
                      rules={[{ required: true, message: 'Missing last name' }]}
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

      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header="手机版" key="1">
          <Form.Item label="手机版图片" name="img_mobile">
            <ImageUpload />
          </Form.Item>
          <Form.Item label="手机版内容" name="content_mobile">
            <ContentEditor />
          </Form.Item>
        </Collapse.Panel>
        <Collapse.Panel header="桌机版" key="2">
          <Form.Item label="桌机版图片" name="img">
            <ImageUpload />
          </Form.Item>
          <Form.Item label="桌机版内容" name="content">
            <ContentEditor />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </Form>
  )
}

export default FormData
