import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { MemberTag } from '@/types/api/MemberTag'
import useMemberTagService from '@/utils/services/useMemberTagService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { MemberTagFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useMemberTagService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<MemberTag>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        name: d.name,
        content: d.content,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<MemberTagFormProps>()
  useEffect(() => {
    if (visible && viewData) {
      form.setFieldsValue(viewData)
    }
  }, [visible])
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑跑马灯"
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
          content: viewData.content,
        }}
      />
    </Modal>
  )
}

export default EditPopup
