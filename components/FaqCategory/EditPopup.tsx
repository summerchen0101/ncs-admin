import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { FaqCategory } from '@/types/api/FaqCategory'
import useFaqCategoryService from '@/utils/services/useFaqCategoryService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { FaqCategoryFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useFaqCategoryService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<FaqCategory>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        name: d.name,
        sort: d.sort,
        is_active: d.is_active,
      })

      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<FaqCategoryFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑分类"
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
          name: viewData.name,
          sort: viewData.sort,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
