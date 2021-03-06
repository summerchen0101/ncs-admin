import { usePopupContext } from '@/context/PopupContext'
import usePageContentService from '@/utils/services/usePageContentService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React from 'react'
import FormData, { PageContentFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = usePageContentService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        title: d.title,
        code: d.code,
        is_active: d.is_active,
        content: d.content,
        content_mobile: d.content_mobile,
      })
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<PageContentFormProps>()
  return (
    <Modal
      title="新增內容"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          title: '',
          code: '',
          is_active: true,
          content: '',
          content_mobile: '',
        }}
      />
    </Modal>
  )
}

export default CreatePopup
