import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { Menu } from '@/types/api/Menu'
import useMenuService from '@/utils/services/useMenuService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { MenuFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useMenuService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Menu>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        parent_id: d.parent_id,
        sort: +d.sort,
        name: d.name,
        path: d.path,
        icon: d.icon,
        is_active: d.is_active,
        permission_ids: d.permission_ids,
        role_ids: d.role_ids,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<MenuFormProps>()
  useEffect(() => {
    if (visible && viewData) {
      form.setFieldsValue(viewData)
    }
  }, [visible])
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑选单"
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
          parent_id: viewData.parent_id,
          sort: viewData.sort,
          name: viewData.name,
          path: viewData.path,
          icon: viewData.icon,
          is_active: viewData.is_active,
          permission_ids: viewData.permissions.map((t) => t.id),
          role_ids: viewData.roles.map((t) => t.id),
        }}
      />
    </Modal>
  )
}

export default EditPopup
