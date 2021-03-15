import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { memberTypeOpts } from '@/lib/options'
import { Message } from '@/types/api/Message'
import useTransfer from '@/utils/useTransfer'
import { Descriptions } from 'antd'
import React, { useEffect } from 'react'
import PopupForm from '../PopupForm'

function ViewPopup() {
  const [visible, setVisible] = usePopupContext('editForm')
  const { toDate, toOptionName } = useTransfer()
  const { viewData } = useDataContext<Message>()

  if (!viewData) return <></>
  return (
    <PopupForm
      title="站内信详情"
      isOpen={visible}
      onClose={() => setVisible(false)}
      size="lg"
    >
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="标题">{viewData.title}</Descriptions.Item>
        <Descriptions.Item label="内容">{viewData.content}</Descriptions.Item>
        <Descriptions.Item label="收件人身份">
          {toOptionName(memberTypeOpts, viewData.member_type)}
        </Descriptions.Item>
        <Descriptions.Item label="收件人帐号">
          {viewData.receiver_accs}
        </Descriptions.Item>
      </Descriptions>
    </PopupForm>
  )
}

export default ViewPopup
