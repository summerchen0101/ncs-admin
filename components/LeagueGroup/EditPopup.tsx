import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
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
        note: d.note,
      })

      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<LeagueGroupFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑联盟群组"
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
          code: viewData.code,
          game_code: viewData.game_code,
          is_active: viewData.is_active,
          note: viewData.note,
        }}
      />
    </Modal>
  )
}

export default EditPopup
