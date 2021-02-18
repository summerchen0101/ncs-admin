import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { AccountingType, MemberType } from '@/lib/enums'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React from 'react'
import ParamsFormData, { ParamsFormProps } from './ParamsFormData'

function ParamsPopup() {
  const { doEdit } = useMemberService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Member>()
  // const handleSubmit = async () => {
  //   try {
  //     const d = await form.validateFields()
  //     await doEdit({
  //       id: viewData.id,
  //       acc: d.acc,
  //       name: d.name,
  //       pass: d.pass,
  //       member_type: d.member_type,
  //       accounting_type: d.accounting_type,
  //       parent_id: 0,
  //       is_active: d.is_active,
  //     })
  //     form.resetFields()
  //     setVisible(false)
  //   } catch (err) {}
  // }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<ParamsFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="遊戲參數設定"
      visible={visible}
      // onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <ParamsFormData
        form={form}
        data={{
          id: viewData.id,
        }}
      />
    </Modal>
  )
}

export default ParamsPopup
