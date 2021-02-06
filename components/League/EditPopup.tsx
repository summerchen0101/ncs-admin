import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { League } from '@/types/api/League'
import useLeagueService from '@/utils/services/useLeagueService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { LeagueFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useLeagueService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<League>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({ id: viewData.id, ...d })
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<LeagueFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="編輯球種"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          name: viewData.name,
          bet365_code: viewData.bet365_code,
          game_code: viewData.game_code,
          group_code: viewData.group_code,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
