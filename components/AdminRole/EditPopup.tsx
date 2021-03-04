import { usePopupContext } from '@/context/PopupContext'
import useAdminRoleService from '@/utils/services/useAdminRoleService'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PopupForm from '../PopupForm'
import FormData, { AdminRoleFormProps } from './FormData'
import { Form, Modal } from 'antd'
import { Box } from '@chakra-ui/react'
import { useDataContext } from '@/context/DataContext'
import { AdminRole } from '@/types/api/AdminRole'

function EditPopup() {
  const { doEdit } = useAdminRoleService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<AdminRole>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        name: d.name,
        permission_ids: d.permission_ids,
        is_active: d.is_active,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<AdminRoleFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑管理员角色"
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
          permission_ids: viewData.permissions.map((t) => t.id),
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
