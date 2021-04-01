import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { AccountingType, MemberType, RestoreType } from '@/lib/enums'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import useHelper from '@/utils/useHelper'
import { Form, Modal } from 'antd'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import FormData, { MemberFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useMemberService()
  const { betSettingObjToArr, createBetSettingObj } = useHelper()
  const { parentBetSettings, viewData, setViewData } = useDataContext<Member>()
  const [visible, setVisible] = usePopupContext('createForm')
  const router = useRouter()
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
        parent_id: viewData?.id || +router.query?.pid,
        is_active: d.is_active,
        is_open_bet: d.is_open_bet,
        bet_settings: betSettingObjToArr(d.bet_settings),
        is_test: d.is_test,
      })
    } catch (err) {
      console.log(err)
    }
  }
  const handleCancel = () => {
    setVisible(false)
  }

  const onClosed = () => {
    setViewData(null)
  }

  const [form] = Form.useForm<MemberFormProps>()

  return (
    <Modal
      title="新增会员"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      afterClose={onClosed}
      width={1000}
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          acc: '',
          name: '',
          pass: '',
          note: '',
          balance: null,
          member_type:
            viewData?.member_type || +router.query?.type || MemberType.Agent,
          accounting_type: viewData?.accounting_type || AccountingType.Cash,
          restore_type: RestoreType.Daily,
          is_active: true,
          is_open_bet: true,
          bet_settings: createBetSettingObj(parentBetSettings),
          lock_member_type: viewData?.member_type === MemberType.Member,
          lock_accounting_type: !!viewData?.accounting_type,
          is_test: viewData?.is_test,
          parent: viewData,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
