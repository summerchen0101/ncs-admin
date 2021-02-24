import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { AdminUser } from '@/types/api/AdminUser'
import useAdminUserService from '@/utils/services/useAdminUserService'
import useValidator from '@/utils/useValidator'
import { Form, Input, Modal } from 'antd'
import React from 'react'
import { AdminUserFormProps } from './FormData'

function PasswordPopup() {
  const VD = useValidator()
  const { doEditPass } = useAdminUserService()
  const [visible, setVisible] = usePopupContext('passwordForm')
  const { viewId } = useDataContext<AdminUser>()
  const [form] = Form.useForm<AdminUserFormProps>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEditPass(viewId, d.pass)
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
