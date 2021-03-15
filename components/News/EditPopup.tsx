import { usePopupContext } from '@/context/PopupContext'
import useNewsService from '@/utils/services/useNewsService'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PopupForm from '../PopupForm'
import FormData, { NewsFormProps } from './FormData'
import { Form, Modal } from 'antd'
import { Box } from '@chakra-ui/react'
import { useDataContext } from '@/context/DataContext'
import { News } from '@/types/api/News'
import moment from 'moment'

function EditPopup() {
  const { doEdit } = useNewsService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<News>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        title: d.title,
        content: d.content,
        news_type: +d.news_type,
        is_active: d.is_active,
        start_at: d.date_range?.[0].startOf('day').unix(),
        end_at: d.date_range?.[1].endOf('day').unix(),
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<NewsFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑公告"
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
          title: viewData.title,
          content: viewData.content,
          news_type: viewData.news_type,
          date_range: [
            viewData.start_at && moment(viewData.start_at * 1000),
            viewData.end_at && moment(viewData.end_at * 1000),
          ],
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
