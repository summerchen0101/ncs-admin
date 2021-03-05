import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { SubAcc } from '@/types/api/SubAcc'
import useSubAccService from '@/utils/services/useSubAccService'
import useValidator from '@/utils/useValidator'
import { Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'
import { SubAccFormProps } from './FormData'

function PasswordPopup() {
  const VD = useValidator()
  const { doEditPass } = useSubAccService()
  const [visible, setVisible] = usePopupContext('passForm')
  const { viewId } = useDataContext<SubAcc>()
  const [form] = Form.useForm<SubAccFormProps>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEditPass(viewId, d.pass)

      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
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
