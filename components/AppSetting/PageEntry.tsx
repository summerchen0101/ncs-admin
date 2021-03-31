import { useDataContext } from '@/context/DataContext'
import { AppSetting } from '@/types/api/AppSetting'
import useAppSettingService from '@/utils/services/useAppSettingService'
import { Box, SimpleGrid } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import { Button, Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo } from 'react'
import Dashboard from '../Dashboard'

interface AppSettingFormProps extends AppSetting {}

const PageEntry: React.FC = () => {
  const router = useRouter()
  const [form] = useForm<AppSettingFormProps>()
  const { fetchById, doEdit } = useAppSettingService()
  const { viewData } = useDataContext<AppSetting>()
  const formData = useMemo<AppSettingFormProps>(() => {
    return {
      bank_card_limit: viewData.bank_card_limit,
      bet_fee_percent: viewData.bet_fee_percent,
      bet_confirm_min: viewData.bet_confirm_min,
    }
  }, [viewData])
  const toast = useToast()

  const onSubmit = async (values: AppSettingFormProps) => {
    try {
      await doEdit(values)
      toast({ status: 'success', title: '修改成功' })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchById()
  }, [])

  return (
    <Dashboard>
      <Box w={[null, '300px']}>
        <Form
          layout="vertical"
          form={form}
          initialValues={formData}
          onFinish={onSubmit}
        >
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
          <Button htmlType="submit">确认送出</Button>
        </Form>
      </Box>
    </Dashboard>
  )
}

export default PageEntry
