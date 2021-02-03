import { usePopupContext } from '@/context/PopupContext'
import useSportGameService from '@/utils/services/useSportGameService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { SportGameFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useSportGameService()
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
  const [form] = Form.useForm<SportGameFormProps>()
  return (
    <Modal
      title="新增球種"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          name: '',
          code: '',
          note: '',
          country_id: null,
          sport_id: null,
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
