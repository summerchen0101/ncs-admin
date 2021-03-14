import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { League } from '@/types/api/League'
import useLeagueService from '@/utils/services/useLeagueService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { LeagueFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useLeagueService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<League>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({ id: viewData.id, ...d })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<LeagueFormProps>()
  useEffect(() => {
    if (visible && viewData) {
      form.setFieldsValue(viewData)
    }
  }, [visible])
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑球种"
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
          game_code: viewData.game_code,
          group_code: viewData.group_code,
          is_active: viewData.is_active,
          note: viewData.note,
        }}
      />
    </Modal>
  )
}

export default EditPopup
