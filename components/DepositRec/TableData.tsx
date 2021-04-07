import BasicTable from '@/components/BasicTable'
import { ProcessStatus } from '@/lib/enums'
import { paymentTypeOpts, processStatusOpts } from '@/lib/options'
import { DepositRec } from '@/types/api/DepositRec'
import useDepositRecService from '@/utils/services/useDepositRecService'
import useTransfer from '@/utils/useTransfer'
import { Tag, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'

const statusColorMap = {
  [ProcessStatus.Finish]: 'green',
  [ProcessStatus.Cancel]: 'red',
}

function TableData({ list }: { list: DepositRec[] }) {
  const { toDateTime } = useTransfer()
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const columns: ColumnsType<DepositRec> = useMemo(
    () => [
      { title: '单号(金流)', render: (_, row) => row.merchant_sn },
      { title: '单号(本地)', render: (_, row) => row.sn },
      {
        title: '帳號/暱稱',
        render: (_, row) => `${row.member.acc}(${row.member.name})`,
      },
      {
        title: '储值金额',
        render: (_, row) => (
          <Text color="blue.500" fontWeight="bold">
            ${toCurrency(row.amount)}
          </Text>
        ),
      },

      {
        title: '支付方式',
        render: (_, row) => toOptionName(paymentTypeOpts, row.payment_type),
      },
      {
        title: '手续费',
        render: (_, row) => toCurrency(row.fee),
      },
      {
        title: '金流手续费',
        render: (_, row) => toCurrency(row.payment_fee),
      },
      // {
      //   title: '付款通知',
      //   render: (_, row) => (
      //     <Icon as={HiCheck} fontSize="25px" color="brand.500" />
      //   ),
      //   align: 'center',
      // },
      {
        title: '订单状态',
        render: (_, row) => {
          return (
            <Tag
              colorScheme={statusColorMap[row.status]}
              variant="solid"
              borderRadius="sm"
            >
              {toOptionName(processStatusOpts, row.status)}
            </Tag>
          )
        },
      },

      { title: '首储', render: (_, row) => (row.is_first ? '是' : '否') },
      { title: '申请时间', render: (_, row) => toDateTime(row.created_at) },
      { title: '入帐时间', render: (_, row) => toDateTime(row.accounting_at) },
      // { title: '截止时间', render: (_, row) => toDateTime(row.created_at) },

      // { title: '审核人员', render: (_, row) => '-' },
      // { title: '审核时间', render: (_, row) => '-' },
      // { title: '入点时间', render: (_, row) => '-' },
      // {
      //   title: '审核',
      //   render: (_, row) => (
      //     <HStack my="-4">
      //       <TipIconButton
      //         label="审核"
      //         colorScheme="purple"
      //         icon={<HiPencilAlt />}
      //         onClick={() => fetchById(row.id)}
      //         disabled={row.status !== ProcessStatus.Pending}
      //       />
      //     </HStack>
      //   ),
      // },
    ],
    [],
  )
  return (
    <>
      {/* <TableSummary>
        <TableSummaryItem label="笔数" num={list.length} decimal={0} />
        <TableSummaryItem label="累积金额" num={100000} />
        <TableSummaryItem label="已付款金额" num={80000}>
          <Text as="span" color="orange.400">
            {toCurrency(80000)}
          </Text>
        </TableSummaryItem>
      </TableSummary> */}
      <BasicTable columns={columns} data={list} />
    </>
  )
}

export default TableData
