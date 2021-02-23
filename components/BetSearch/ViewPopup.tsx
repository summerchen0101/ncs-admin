import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import { Marquee } from '@/types/api/Marquee'
import { Member } from '@/types/api/Member'
import useTransfer from '@/utils/useTransfer'
import { Descriptions, Modal } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'
import BasicTable from '../BasicTable'

function ViewPopup() {
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Member>()
  const { toCurrency, toDateTime, toOptionName } = useTransfer()
  if (!viewData) return <></>
  const columns: ColumnsType<Marquee> = [
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
      <BasicTable columns={columns} data={Array(5).fill('')} />
    </Modal>
  )
}

export default ViewPopup
