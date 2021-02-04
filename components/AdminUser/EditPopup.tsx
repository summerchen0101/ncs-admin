import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { AdminUser } from '@/types/api/AdminUser'
import useAdminUserService from '@/utils/services/useAdminUserService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { AdminUserFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useAdminUserService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<AdminUser>()
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
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<AdminUserFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="編輯管理員"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
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
