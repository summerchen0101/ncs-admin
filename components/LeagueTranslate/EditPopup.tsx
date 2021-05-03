import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { LeagueTranslate } from '@/types/api/LeagueTranslate'
import useLeagueTranslateService from '@/utils/services/useLeagueTranslateService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { LeagueTranslateFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useLeagueTranslateService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<LeagueTranslate>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        name: d.name,
        fix_name: d.fix_name,
        is_active: d.is_active,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<LeagueTranslateFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑队伍翻译"
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
          fix_name: viewData.fix_name,
          is_active: viewData.is_active,
          game_code: viewData.game_code,
        }}
      />
    </Modal>
  )
}

export default EditPopup
