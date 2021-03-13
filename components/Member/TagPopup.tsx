import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import TagFormData, { TagFormProps } from './TagFormData'

function TagPopup() {
  const { doEditTags } = useMemberService()
  const [visible, setVisible] = usePopupContext('tag')
  const { viewData, setViewData } = useDataContext<Member>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEditTags({
        id: viewData.id,
        tag_ids: d.tag_ids,
      })
      setVisible(false)
    } catch (err) {}
  }
  const onClosed = () => {
    setViewData(null)
  }
  const [form] = Form.useForm<TagFormProps>()
  // useEffect(() => {
  //   if (visible && viewData) {
  //     form.setFieldsValue(viewData)
  //   }
  // }, [visible])
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑会员標籤"
      visible={visible}
      onOk={handleSubmit}
      centered
      destroyOnClose
      onCancel={() => setVisible(false)}
      afterClose={onClosed}
      width={400}
    >
      <TagFormData
        form={form}
        data={{
          id: viewData.id,
          tag_ids: viewData.tags.map((t) => t.id),
        }}
      />
    </Modal>
  )
}

export default TagPopup
