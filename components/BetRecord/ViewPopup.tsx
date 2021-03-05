import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { BetRatio } from '@/types/api/BetRatio'
import { BetRecord } from '@/types/api/BetRecord'
import { Member } from '@/types/api/Member'
import { Text, VStack } from '@chakra-ui/layout'
import { Modal } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React, { useEffect } from 'react'
import BasicTable from '../BasicTable'
import ColorText from '../ColorText'
import numeral from 'numeral'

function ViewPopup() {
  const [visible, setVisible] = usePopupContext('view')
  const { viewData, betRatios } = useDataContext<Member>()

  if (!viewData) return <></>
  const columns: ColumnsType<BetRatio> = [
    { title: '階層', render: (_, row, index) => `第${index + 1}層` },
    {
      title: '帳號/暱稱',
      render: (_, row) => `${row.agent.acc}[${row.agent.name}]`,
    },
    {
      title: '退水',
      render: (_, row) => (
        <VStack spacing="3px">
          <Text>{row.rebate}</Text>
          <Text color="blue.500">{row.rebate_percent}%</Text>
        </VStack>
      ),
    },
    {
      title: '服務費',
      render: (_, row) => (
        <VStack spacing="3px">
          <Text>{row.fee}</Text>
          <Text color="blue.500">{row.fee_percent}%</Text>
        </VStack>
      ),
    },
    {
      title: '佔成',
      render: (_, row) => `${row.risk_percent}%`,
    },
    { title: '結果', render: (_, row) => <ColorText num={row.result} /> },
  ]
  return (
    <Modal
      title="上層代理佔成資訊"
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
      width={600}
    >
      <BasicTable columns={columns} data={betRatios} />
    </Modal>
  )
}

export default ViewPopup
