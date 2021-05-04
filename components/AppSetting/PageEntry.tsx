import { useDataContext } from '@/context/DataContext'
import { AppSetting } from '@/types/api/AppSetting'
import useAppSettingService from '@/utils/services/useAppSettingService'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import {
  Box,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/layout'
import { Form, Input, InputNumber } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import { HiOutlineCog } from 'react-icons/hi'
import Dashboard from '../Dashboard'

interface AppSettingFormProps extends AppSetting {}

const PageEntry: React.FC = () => {
  const router = useRouter()
  const [form] = useForm<AppSettingFormProps>()
  const { fetchById, doEdit } = useAppSettingService()
  const { viewData } = useDataContext<AppSetting>()

  const onSubmit = async (values: AppSettingFormProps) => {
    try {
      await doEdit(values)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchById()
  }, [])

  useEffect(() => {
    form.setFieldsValue(viewData)
  }, [viewData])

  return (
    <Dashboard>
      <Box w={[null, '400px']}>
        <HStack my="15px" fontSize="20px" fontWeight="600" spacing="1">
          <HiOutlineCog fontSize="25px" />
          <Text>网站设置值</Text>
        </HStack>
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <SimpleGrid columns={2} spacingX="20px">
            <Form.Item
              label="银行卡最大张数"
              name="bank_card_limit"
              rules={[{ required: true }]}
            >
              <Input addonAfter="张" />
            </Form.Item>
            <Form.Item
              label="注单手续费%"
              name="bet_fee_percent"
              rules={[{ required: true }]}
            >
              <Input addonAfter="%" />
            </Form.Item>
            <Form.Item
              label="下注后可撤单时间"
              name="bet_confirm_min"
              rules={[{ required: true }]}
            >
              <Input addonAfter="分" />
            </Form.Item>
          </SimpleGrid>
          <Form.Item
            label="客服连结"
            name="live_help_url"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="线上人数" rules={[{ required: true }]}>
            <HStack as={Input.Group}>
              <Form.Item
                name="online_count_min"
                noStyle
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Text>~</Text>
              <Form.Item
                name="online_count_max"
                noStyle
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </HStack>
          </Form.Item>

          <Button type="submit" w="full" colorScheme="brand" borderRadius="sm">
            确认修改
          </Button>
        </Form>
      </Box>
    </Dashboard>
  )
}

export default PageEntry
