import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import useHelper from '@/utils/useHelper'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { MemberFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useMemberService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData, betSettings } = useDataContext<Member>()
  const { createBetSettingObj } = useHelper()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        acc: d.acc,
        name: d.name,
        pass: d.pass,
        member_type: d.member_type,
        accounting_type: d.accounting_type,
        parent_id: 0,
        is_active: d.is_active,
        is_open_bet: d.is_open_bet,
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
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑会员"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      width={1000}
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          acc: viewData.acc,
          name: viewData.name,
          note: viewData.note,
          balance: viewData.balance,
          pass: '',
          member_type: viewData.member_type,
          accounting_type: viewData.accounting_type,
          restore_type: viewData.restore_type,
          is_active: viewData.is_active,
          is_open_bet: viewData.is_open_bet,
          bet_settings: createBetSettingObj(betSettings),
        }}
      />
    </Modal>
  )
}

export default EditPopup
