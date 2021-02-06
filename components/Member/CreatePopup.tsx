import { usePopupContext } from '@/context/PopupContext'
import { AccountingType, MemberType } from '@/lib/enums'
import useMemberService from '@/utils/services/useMemberService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React from 'react'
import FormData, { MemberFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useMemberService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        acc: d.acc,
        name: d.name,
        pass: d.pass,
        member_type: d.member_type,
        accounting_type: d.accounting_type,
        parent_id: 0,
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
  const [form] = Form.useForm<MemberFormProps>()
  return (
    <Modal
      title="新增會員"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          acc: '',
          name: '',
          pass: '',
          member_type: MemberType.Agent,
          accounting_type: AccountingType.Cash,
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
