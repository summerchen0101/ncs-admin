import { usePopupContext } from '@/context/PopupContext'
import useFaqService from '@/utils/services/useFaqService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React from 'react'
import FormData, { FaqFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useFaqService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        catalogue_id: d.catalogue_id,
        title: d.title,
        content: d.content,
        content_mobile: d.content_mobile,
        is_active: d.is_active,
      })
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<FaqFormProps>()
  return (
    <Modal
      title="新增問題"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          catalogue_id: null,
          title: '',
          content: '',
          content_mobile: '',
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
