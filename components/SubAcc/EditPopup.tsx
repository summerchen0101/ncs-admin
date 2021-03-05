import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { SubAcc } from '@/types/api/SubAcc'
import useSubAccService from '@/utils/services/useSubAccService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { SubAccFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useSubAccService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<SubAcc>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        acc: d.acc,
        name: d.name,
        role_ids: d.role_ids,
        permission_ids: d.permission_ids,
        is_active: d.is_active,
        status: d.is_locked ? BlockStatus.Blocked : BlockStatus.Normal,
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
          role_ids: viewData.roles.map((t) => t.id),
          permission_ids: viewData.permissions.map((t) => t.id),
          is_active: viewData.is_active,
          is_locked: viewData.status === BlockStatus.Blocked,
        }}
      />
    </Modal>
  )
}

export default EditPopup
