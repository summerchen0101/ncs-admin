import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { Sport } from '@/types/api/Sport'
import useSportService from '@/utils/services/useSportService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { SportFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useSportService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Sport>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({ id: viewData.id, name: d.name })

      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<SportFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑运动"
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
          code: viewData.code,
        }}
      />
    </Modal>
  )
}

export default EditPopup
