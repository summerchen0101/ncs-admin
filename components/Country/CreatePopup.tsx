import { usePopupContext } from '@/context/PopupContext'
import useCountryService from '@/utils/services/useCountryService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { CountryFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useCountryService()
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
  const [form] = Form.useForm<CountryFormProps>()
  return (
    <Modal
      title="新增國家"
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
