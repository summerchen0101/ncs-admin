import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { Menu } from '@/types/api/Menu'
import useMenuService from '@/utils/services/useMenuService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { MenuFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useMenuService()
  const [visible, setVisible] = usePopupContext('createForm')
  const { viewId, list } = useDataContext<Menu>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
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
    visible && form.resetFields()
  }, [visible])
  return (
    <Modal
      title="新增选单"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          parent_id: viewId,
          sort: list.length + 1,
          name: '',
          path: '',
          icon: '',
          is_active: true,
          permission_ids: [],
          role_ids: [],
        }}
      />
    </Modal>
  )
}

export default CreatePopup
