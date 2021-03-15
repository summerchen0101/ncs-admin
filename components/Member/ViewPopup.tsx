import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { Member } from '@/types/api/Member'
import useTransfer from '@/utils/useTransfer'
import { Descriptions, Modal } from 'antd'
import React, { useEffect } from 'react'

function ViewPopup() {
  const [visible, setVisible] = usePopupContext('view')
  const { viewData } = useDataContext<Member>()
  const { toCurrency, toDateTime, toOptionName } = useTransfer()

  if (!viewData) return <></>
  return (
    <Modal
      title="会员资讯"
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="帐号/暱称">
          {viewData.acc} [{viewData.name}]
        </Descriptions.Item>
        <Descriptions.Item label="会员数">
          {viewData.member_count || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="余额">
          {toCurrency(viewData.balance)}
        </Descriptions.Item>
        <Descriptions.Item label="锁定">
          {viewData.status === BlockStatus.Blocked ? '是' : '否'}
        </Descriptions.Item>
        <Descriptions.Item label="启用">
          {viewData.is_active ? '是' : '否'}
        </Descriptions.Item>
        <Descriptions.Item label="可下注">
          {viewData.is_open_bet ? '是' : '否'}
        </Descriptions.Item>

        <Descriptions.Item label="最后登录IP">
          {viewData.login_ip || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="最后登录时间">
          {viewData.logined_at || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="登录失败次数">
          {viewData.login_error_times || '-'}
        </Descriptions.Item>

        <Descriptions.Item label="建立时间">
          {toDateTime(viewData.created_at)}
        </Descriptions.Item>
        <Descriptions.Item label="更新时间">
          {toDateTime(viewData.created_at)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default ViewPopup
