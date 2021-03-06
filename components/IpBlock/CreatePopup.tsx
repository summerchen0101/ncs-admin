import { usePopupContext } from '@/context/PopupContext'
import { IPBlockType, PlatformType } from '@/lib/enums'
import useIpBlockService from '@/utils/services/useIpBlockService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React from 'react'
import FormData, { IpBlockFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useIpBlockService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
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
  return (
    <Modal
      title="新增黑名單IP"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          block_type: IPBlockType.Black,
          platform_type: PlatformType.Admin,
          ip: '',
          note: '',
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
