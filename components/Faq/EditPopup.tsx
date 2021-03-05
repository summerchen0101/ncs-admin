import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { Faq } from '@/types/api/Faq'
import useFaqService from '@/utils/services/useFaqService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
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
        content_mobile: d.content_mobile,
        is_active: d.is_active,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<FaqFormProps>()
  useEffect(() => {
    if (visible && viewData) {
      form.setFieldsValue(viewData)
    }
  }, [visible])
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑问题"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
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
