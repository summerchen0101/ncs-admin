import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import useValidator from '@/utils/useValidator'
import { Form, Input, Modal } from 'antd'
import React from 'react'
import { MemberFormProps } from './FormData'

function PasswordPopup() {
  const VD = useValidator()
  // const { doEditPass } = useMemberService()
  const [visible, setVisible] = usePopupContext('passwordForm')
  const { viewId } = useDataContext<Member>()
  const [form] = Form.useForm<MemberFormProps>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      // await doEditPass(viewId, d.pass)
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  return (
    <Modal
      title="密碼修改"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      width={400}
    >
      <Form form={form} layout="vertical" validateTrigger="onBlur">
        <Form.Item
          label="密碼"
          name="pass"
          rules={[{ required: true }, VD.userPassword]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="確認密碼"
          name="pass_c"
          rules={[{ required: true }, VD.sameAs('pass')]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default PasswordPopup
