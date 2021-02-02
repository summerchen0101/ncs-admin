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
      title="編輯管理員角色"
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

export default EditPopup
