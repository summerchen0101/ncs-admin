import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import useSubAccService from '@/utils/services/useSubAccService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { SubAccFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useSubAccService()
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
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<SubAccFormProps>()
  useEffect(() => {
    visible && form.resetFields()
  }, [visible])
  return (
    <Modal
      title="新增子帳號"
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
