import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { Member } from '@/types/api/Member'
import useTransfer from '@/utils/useTransfer'
import { Descriptions, Modal } from 'antd'
import React from 'react'

function ViewPopup() {
  const [visible, setVisible] = usePopupContext('view')
  const { viewData } = useDataContext<Member>()
  const { toCurrency, toDateTime, toOptionName } = useTransfer()
  if (!viewData) return <></>
  return (
    <Modal
      title="會員資訊"
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="帳號/暱稱">
          {viewData.acc} [{viewData.name}]
        </Descriptions.Item>
        <Descriptions.Item label="會員數">
          {viewData.member_count || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="餘額">
          {toCurrency(viewData.balance)}
        </Descriptions.Item>
        <Descriptions.Item label="鎖定">
          {viewData.status === BlockStatus.Blocked ? '是' : '否'}
        </Descriptions.Item>
        <Descriptions.Item label="啟用">
          {viewData.is_active ? '是' : '否'}
        </Descriptions.Item>
        <Descriptions.Item label="可下注">
          {viewData.is_open_bet ? '是' : '否'}
        </Descriptions.Item>

        <Descriptions.Item label="最後登入IP">
          {viewData.login_ip || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="最後登入時間">
          {viewData.logined_at || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="登入失敗次數">
          {viewData.login_error_times || '-'}
        </Descriptions.Item>

        <Descriptions.Item label="建立時間">
          {toDateTime(viewData.created_at)}
        </Descriptions.Item>
        <Descriptions.Item label="更新時間">
          {toDateTime(viewData.created_at)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default ViewPopup
