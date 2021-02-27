import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { BetRatio } from '@/types/api/BetRatio'
import { BetRecord } from '@/types/api/BetRecord'
import { Member } from '@/types/api/Member'
import { Modal } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'
import BasicTable from '../BasicTable'

function ViewPopup() {
  const [visible, setVisible] = usePopupContext('view')
  const { viewData, betRatios } = useDataContext<Member>()
  if (!viewData) return <></>
  const columns: ColumnsType<BetRatio> = [
    { title: '階層', render: (_, row, index) => `第${index}層` },
    { title: '帳號/暱稱', render: (_, row) => 'abbc[ABBC]' },
    { title: '佔成', render: (_, row) => '20%' },
    { title: '退水', render: (_, row) => '0' },
  ]
  return (
    <Modal
      title="上層代理佔成資訊"
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <BasicTable columns={columns} data={betRatios} />
    </Modal>
  )
}

export default ViewPopup
