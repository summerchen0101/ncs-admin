import { usePopupContext } from '@/context/PopupContext'
import { AccountingType, MemberType, RestoreType } from '@/lib/enums'
import useMemberService from '@/utils/services/useMemberService'
import useHelper from '@/utils/useHelper'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { MemberFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useMemberService()
  const { betSettingObjToArr, createBetSettingObj } = useHelper()
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
        restore_type: d.restore_type,
        note: d.note,
        parent_id: 0,
        is_active: d.is_active,
        bet_settings: betSettingObjToArr(d.bet_settings),
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
      title="新增会员"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      width={1000}
    >
      <FormData
        form={form}
        data={{
          acc: '',
          name: '',
          pass: '',
          note: '',
          balance: null,
          member_type: MemberType.Agent,
          accounting_type: AccountingType.Cash,
          restore_type: RestoreType.Daily,
          is_active: true,
          bet_settings: createBetSettingObj(),
        }}
      />
    </Modal>
  )
}

export default CreatePopup
