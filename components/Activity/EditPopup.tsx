import { usePopupContext } from '@/context/PopupContext'
import useActivityService from '@/utils/services/useActivityService'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PopupForm from '../PopupForm'
import FormData, { ActivityFormProps } from './FormData'
import { Form, Modal } from 'antd'
import { Box } from '@chakra-ui/react'
import { useDataContext } from '@/context/DataContext'
import { Activity } from '@/types/api/Activity'
import moment from 'moment'

function EditPopup() {
  const { doEdit } = useActivityService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Activity>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      console.log(d)
      await doEdit({
        id: viewData.id,
        title: d.title,
        content: d.content,
        content_mobile: d.content_mobile,
        start_at: d.date_range_type === 'limit' ? d.limit_range[0].unix() : 0,
        end_at: d.date_range_type === 'limit' ? d.limit_range[1].unix() : 0,
        img: d.img,
        img_mobile: d.img_mobile,
        bonus: d.bonus,
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
  const [form] = Form.useForm<ActivityFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="編輯活動"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          title: viewData.title,
          content: viewData.content,
          date_range_type: viewData.start_at ? 'limit' : 'forever',
          limit_range: [
            viewData.start_at && moment(viewData.start_at * 1000),
            viewData.start_at && moment(viewData.start_at * 1000),
          ],
          is_active: viewData.is_active,
          content_mobile: viewData.content_mobile,
          img: viewData.img,
          img_mobile: viewData.img_mobile,
          bonus: viewData.bonus,
        }}
      />
    </Modal>
  )
}

export default EditPopup
