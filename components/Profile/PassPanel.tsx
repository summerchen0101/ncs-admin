import { useDataContext } from '@/context/DataContext'
import { Member } from '@/types/api/Member'
import useMemberAPI from '@/utils/apis/useMemberAPI'
import useErrorHandler from '@/utils/useErrorHandler'
import useValidator from '@/utils/useValidator'
import { AccordionItem, AccordionPanel } from '@chakra-ui/accordion'
import { Button, Input, useToast } from '@chakra-ui/react'
import { Form } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React from 'react'
import { BiUser } from 'react-icons/bi'
import PanelHeader from './PanelHeader'

interface PassFormProps {
  old_pass: string
  pass: string
  pass_confirm: string
}

function PassPanel() {
  const { viewData } = useDataContext<Member>()
  const VD = useValidator()
  const API = useMemberAPI()
  const { apiErrHandler } = useErrorHandler()
  const toast = useToast()
  const [form] = useForm<PassFormProps>()

  const handleSubmit = async (d) => {
    try {
      await API.selfPass({
        old_pass: d.old_pass,
        pass: d.pass,
      })
      form.resetFields()
      toast({ status: 'success', title: '更新成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return (
    <AccordionItem flex={1}>
      <PanelHeader title="個人資料" bg="teal.500" icon={BiUser} />
      <AccordionPanel py="4" bg="gray.300" borderBottomRadius="md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="帳號">
            <Input bg="white" disabled defaultValue={viewData?.acc} />
          </Form.Item>
          <Form.Item label="暱稱">
            <Input bg="white" disabled defaultValue={viewData?.name} />
          </Form.Item>
          <Form.Item
            label="舊密碼"
            name="old_pass"
            rules={[{ required: true }]}
          >
            <Input type="password" bg="white" />
          </Form.Item>
          <Form.Item
            label="新密碼"
            name="pass"
            rules={[{ required: true }, VD.userPassword]}
          >
            <Input type="password" bg="white" />
          </Form.Item>
          <Form.Item
            label="確認新密碼"
            name="pass_c"
            rules={[{ required: true }, VD.sameAs('pass')]}
          >
            <Input type="password" bg="white" />
          </Form.Item>
          <Form.Item>
            <Button w="full" colorScheme="teal" mt="15px" type="submit">
              密碼修改
            </Button>
          </Form.Item>
        </Form>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default PassPanel
