import { usePopupContext } from '@/context/PopupContext'
import useSportService from '@/utils/services/useSportService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { SportFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useSportService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate(d)
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<SportFormProps>()
  return (
    <Modal
      title="新增運動"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          name: '',
          code: '',
          note: '',
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
