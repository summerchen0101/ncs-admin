import { usePopupContext } from '@/context/PopupContext'
import useAdminRoleService from '@/utils/services/useAdminRoleService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { AdminRoleFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useAdminRoleService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        name: d.name,
        permission_ids: d.permission_ids,
        is_active: d.is_active,
      })
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<AdminRoleFormProps>()
  return (
    <Modal
      title="新增管理員角色"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          name: '',
          permission_ids: [],
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
