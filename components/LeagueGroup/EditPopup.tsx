import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { LeagueGroup } from '@/types/api/LeagueGroup'
import useLeagueGroupService from '@/utils/services/useLeagueGroupService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { LeagueGroupFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useLeagueGroupService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<LeagueGroup>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        name: d.name,
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
  const [form] = Form.useForm<LeagueGroupFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="編輯聯盟群組"
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
          code: viewData.code,
          game_code: viewData.game_code,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
