import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import useAdminUserService from '@/utils/services/useAdminUserService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { AdminUserFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useAdminUserService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        acc: d.acc,
        pass: d.pass,
        name: d.name,
        role_ids: d.role_ids,
        permission_ids: d.permission_ids,
        is_active: d.is_active,
        status: d.is_locked ? BlockStatus.Blocked : BlockStatus.Normal,
      })

      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<AdminUserFormProps>()
  return (
    <Modal
      title="新增管理员"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          acc: '',
          name: '',
          role_ids: [],
          permission_ids: [],
          is_active: true,
          is_locked: false,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
