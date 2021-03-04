import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { Team } from '@/types/api/Team'
import useTeamService from '@/utils/services/useTeamService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { TeamFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useTeamService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Team>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({ id: viewData.id, ...d })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<TeamFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑队伍"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          name: viewData.name,
          name_en: viewData.name_en,
          note: viewData.note,
          game_code: viewData.league.game_code,
          league_id: viewData.league.id,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
