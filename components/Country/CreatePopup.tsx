import { usePopupContext } from '@/context/PopupContext'
import useCountryService from '@/utils/services/useCountryService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { CountryFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useCountryService()
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
  const [form] = Form.useForm<CountryFormProps>()
  useEffect(() => {
    visible && form.resetFields()
  }, [visible])
  return (
    <Modal
      title="新增国家"
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
