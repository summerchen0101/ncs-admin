import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import useOptionsService from '@/utils/services/useOptionsService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import EditFormData, { EditMemberFormProps } from './EditFormData'

function EditPopup() {
  const { doEdit } = useMemberService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData, setViewData } = useDataContext<Member>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        name: d.name,
        note: d.note,
        restore_type: d.restore_type,
        is_lock_promo_level: d.is_lock_promo_level,
        promo_level_id: d.promo_level_id,
      })
      setVisible(false)
    } catch (err) {}
  }
  const onClosed = () => {
    setViewData(null)
  }
  const [form] = Form.useForm<EditMemberFormProps>()
  if (!viewData) return <></>
  // useEffect(() => {
  //   fetchAffiliateLevelOptions()
  // }, [])
  return (
    <Modal
      title="编辑会员"
      visible={visible}
      onOk={handleSubmit}
      centered
      destroyOnClose
      onCancel={() => setVisible(false)}
      afterClose={onClosed}
    >
      <EditFormData
        form={form}
        data={{
          id: viewData.id,
          acc: viewData.acc,
          name: viewData.name,
          note: viewData.note,
          restore_type: viewData.restore_type,
          member_type: viewData.member_type,
          accounting_type: viewData.accounting_type,
          promo_level_id: viewData.promo_level_id,
          is_lock_promo_level: viewData.is_lock_promo_level,
        }}
      />
    </Modal>
  )
}

export default EditPopup
