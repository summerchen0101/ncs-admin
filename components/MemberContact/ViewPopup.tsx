import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { MemberContact } from '@/types/api/MemberContact'
import useMemberContactService from '@/utils/services/useMemberContactService'
import useTransfer from '@/utils/useTransfer'
import { Descriptions, Modal } from 'antd'
import React from 'react'

function ViewPopup() {
  const { setConfirm } = useMemberContactService()
  const [visible, setVisible] = usePopupContext('view')
  const { viewData } = useDataContext<MemberContact>()
  const { toCurrency, toDateTime } = useTransfer()
  const handleSubmit = async () => {
    try {
      await setConfirm(viewData.id, true)
      setVisible(false)
    } catch (err) {}
  }
  if (!viewData) return <></>
  return (
    <Modal
      title="会员联络资讯"
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={false}
    >
      <Descriptions
        bordered
        size="small"
        column={1}
        labelStyle={{ width: '100px' }}
      >
        <Descriptions.Item label="会员">
          {viewData.member?.acc} [{viewData.member?.name}]
        </Descriptions.Item>
        <Descriptions.Item label="手机">
          {viewData.mobile || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="Telegram">
          {viewData.telegram_id || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="Line">
          {viewData.line_id || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="QQ">
          {viewData.qq_id || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="WeChat">
          {viewData.wechat_id || '-'}
        </Descriptions.Item>

        <Descriptions.Item label="更新时间">
          {toDateTime(viewData.updated_at)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default ViewPopup
