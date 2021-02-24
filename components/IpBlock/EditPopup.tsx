import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { IpBlock } from '@/types/api/IpBlock'
import useIpBlockService from '@/utils/services/useIpBlockService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { IpBlockFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useIpBlockService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<IpBlock>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        block_type: d.block_type,
        platform_type: d.platform_type,
        ip: d.ip,
        note: d.note,
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
  const [form] = Form.useForm<IpBlockFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑黑名单IP"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          block_type: viewData.ip_block_type,
          platform_type: viewData.platform_type,
          ip: viewData.ip,
          note: viewData.note,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
