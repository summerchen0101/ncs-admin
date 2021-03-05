import { usePopupContext } from '@/context/PopupContext'
import useSportService from '@/utils/services/useSportService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { SportFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useSportService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate(d)

      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<SportFormProps>()
  useEffect(() => {
    visible && form.resetFields()
  }, [visible])
  return (
    <Modal
      title="新增运动"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          name: '',
          code: '',
        }}
      />
    </Modal>
  )
}

export default CreatePopup
