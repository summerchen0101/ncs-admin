import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus, ReviewStatus } from '@/lib/enums'
import { processStatusOpts, reviewStatusOpts } from '@/lib/options'
import { WithdrawRec } from '@/types/api/WithdrawRec'
import useWithdrawRecService from '@/utils/services/useWithdrawRecService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Tag, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import numeral from 'numeral'
import React, { useMemo } from 'react'
import { HiPencilAlt } from 'react-icons/hi'

function TableData({ list }: { list: WithdrawRec[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById } = useWithdrawRecService()
  const { setViewData } = useDataContext<WithdrawRec>()
  const [, setReviewVisible] = usePopupContext('editForm')
  const { toOptionName, toDate, toCurrency } = useTransfer()

  const handleReview = (data: WithdrawRec) => {
    setViewData(data)
    setReviewVisible(true)
  }
  const columns: ColumnsType<WithdrawRec> = useMemo(
    () => [
      { title: '申请时间', render: (_, row) => toDateTime(row.created_at) },
      { title: '单号(金流)', render: (_, row) => row.merchant_sn || '-' },
      { title: '单号(本地)', render: (_, row) => row.sn },
      {
        title: '帐号/暱称',
        render: (_, row) => `${row.member.acc}(${row.member.name})`,
      },
      {
        title: '出款银行',
        render: (_, row) => `${row.bank_name} - ${row.bank_branch}`,
      },
      {
        title: '银行帐户',
        render: (_, row) => `${row.bank_acc} (${row.bank_person})`,
      },
      {
        title: '提领金额',
        render: (_, row) => (
          <Text color="blue.500" fontWeight="bold">
            ${toCurrency(row.amount)}
          </Text>
        ),
      },
      {
        title: '余额',
        render: (_, row) => `$${toCurrency(row.balance)}`,
      },
      {
        title: '首提',
        render: (_, row) => (row.is_first ? '是' : '否'),
      },

      {
        title: '出款金额',
        render: (_, row) => (
          <Text color="red.600" fontWeight="bold">
            $
            {toCurrency(
              numeral(row.amount)
                .subtract(row.fee)
                .subtract(row.payment_fee)
                .value(),
            )}
          </Text>
        ),
      },
      { title: '出款时间', render: (_, row) => toDateTime(row.accounting_at) },

      {
        title: '状态',
        render: (_, row) => {
          const colorMap = {
            [ProcessStatus.Finish]: 'green',
            [ProcessStatus.Cancel]: 'red',
          }
          return (
            <Tag
              colorScheme={colorMap[row.status]}
              variant="solid"
              borderRadius="sm"
            >
              {toOptionName(processStatusOpts, row.status)}
            </Tag>
          )
        },
      },
      {
        title: '审核状态',
        render: (_, row) => {
          const colorMap = {
            [ProcessStatus.Finish]: 'green',
            [ProcessStatus.Cancel]: 'red',
          }
          return (
            <Tag
              colorScheme={colorMap[row.confirm_status]}
              variant="solid"
              borderRadius="sm"
            >
              {toOptionName(processStatusOpts, row.confirm_status)}
            </Tag>
          )
        },
      },
      { title: '审核人员', render: (_, row) => '-' },
      { title: '审核时间', render: (_, row) => '-' },
      { title: '拨款时间', render: (_, row) => '-' },
      {
        title: '审核',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="审核"
              colorScheme="purple"
              icon={<HiPencilAlt />}
              onClick={() => handleReview(row)}
              disabled={!!row.accounting_at}
            />
          </HStack>
        ),
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
