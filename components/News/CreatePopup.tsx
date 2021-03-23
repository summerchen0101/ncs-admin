import { usePopupContext } from '@/context/PopupContext'
import useNewsService from '@/utils/services/useNewsService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { NewsFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useNewsService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        title: d.title,
        content: d.content,
        news_type: +d.news_type,
        is_active: d.is_active,
        start_at: d.date_range_type === 'limit' ? d.limit_range[0].unix() : 0,
        end_at: d.date_range_type === 'limit' ? d.limit_range[1].unix() : 0,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<NewsFormProps>()

  return (
    <Modal
      title="新增公告"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          title: '',
          content: '',
          news_type: null,
          date_range_type: 'forever',
          limit_range: [null, null],
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
