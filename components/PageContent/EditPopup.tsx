import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { PageContent } from '@/types/api/PageContent'
import usePageContentService from '@/utils/services/usePageContentService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { PageContentFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = usePageContentService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<PageContent>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        title: d.title,
        code: d.code,
        is_active: d.is_active,
        content: d.content,
        content_mobile: d.content_mobile,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<PageContentFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑内容"
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
          title: viewData.title,
          code: viewData.code,
          is_active: viewData.is_active,
          content: viewData.content,
          content_mobile: viewData.content_mobile,
        }}
      />
    </Modal>
  )
}

export default EditPopup
