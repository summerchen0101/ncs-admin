import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { MemberShadow } from '@/types/api/MemberShadow'
import useSubAccService from '@/utils/services/useMemberShadowService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { SubAccFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useSubAccService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<MemberShadow>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        name: d.name,
        note: d.note,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<SubAccFormProps>()
  useEffect(() => {
    if (visible && viewData) {
      form.setFieldsValue(viewData)
    }
  }, [visible])
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑子帳號"
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
          acc: viewData.acc,
          name: viewData.name,
          note: viewData.note,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
