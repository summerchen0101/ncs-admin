import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { Faq } from '@/types/api/Faq'
import useFaqService from '@/utils/services/useFaqService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { FaqFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useFaqService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Faq>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        catalogue_id: d.catalogue_id,
        title: d.title,
        content: d.content,
        content_mobile: viewData.content_mobile,
        is_active: viewData.is_active,
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
  if (!viewData) return <></>
  return (
    <Modal
      title="編輯跑馬燈"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          catalogue_id: viewData.catalogue.id,
          title: viewData.title,
          content: viewData.content,
          content_mobile: viewData.content_mobile,
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default EditPopup
