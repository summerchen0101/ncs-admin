import { usePopupContext } from '@/context/PopupContext'
import useBannerService from '@/utils/services/useBannerService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { BannerFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useBannerService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        title: d.title,
        url: d.url,
        is_blank: d.is_blank,
        start_at: d.date_range?.[0].startOf('day').unix() || 0,
        end_at: d.date_range?.[1].unix() || 0,
        is_active: d.is_active,
        img: d.img,
        img_mobile: d.img_mobile,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<BannerFormProps>()
  useEffect(() => {
    visible && form.resetFields()
  }, [visible])
  return (
    <Modal
      title="新增轮播图"
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
          url: '',
          date_range: [null, null],
          is_active: true,
          is_blank: false,
          img: '',
          img_mobile: '',
        }}
      />
    </Modal>
  )
}

export default CreatePopup
