import BasicTable from '@/components/BasicTable'
import { gameOpts } from '@/lib/options'
import { OptionType } from '@/types'
import { AgentReport } from '@/types/api/AgentReport'
import useTransfer from '@/utils/useTransfer'
import { HStack, Text } from '@chakra-ui/layout'
import Table, { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import React, { useMemo } from 'react'
import ColorText from '../ColorText'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import menu from '@/lib/menu'
import ParentTree from '../ParentTree'
import { useDataContext } from '@/context/DataContext'
import TableSummary from '../TableSummary'
import TableSummaryItem from '../TableSummaryItem'

const MONTHS = () => {
  const months: string[] = []
  const dateStart = moment().subtract(4, 'month')
  const dateEnd = moment()
  while (dateEnd.diff(dateStart, 'months') > 0) {
    months.push(dateStart.format('YYYY-MM'))
    dateStart.add(1, 'month')
  }
  return months
}

function TableData({ list }: { list: AgentReport[] }) {
  const { toCurrency } = useTransfer()
  const router = useRouter()
  const { parentTree, agentReportSummary: summary } = useDataContext()
  const columns: ColumnsType<AgentReport> = useMemo(
    () => [
      {
        title: '帐号/暱称',
        fixed: true,
        render: (_, row) => {
          if (row.agent_count > 0) {
            return (
              <Link
                href={{
                  pathname: menu.report.pages.agent.path,
                  query: { ...router.query, pid: row.id },
                }}
              >
                <Text color="brand.500" as="a">
                  {row.acc}[{row.name}]
                </Text>
              </Link>
            )
          }
          return `${row.acc}[${row.name}]`
        },
      },
      {
        title: '下注笔数',
        render: (_, row) => toCurrency(row.count, 0),
      },
      {
        title: '总注额',
        render: (_, row) => toCurrency(row.amount),
      },
      {
        title: '有效注额',
        render: (_, row) => toCurrency(row.valid_amount),
      },
      {
        title: '累计输额',
        render: (_, row) => <ColorText num={row.lose_result} />,
      },
      {
        title: '累计赢额',
        render: (_, row) => <ColorText num={row.win_result} />,
      },
      {
        title: '未过帐注额',
        render: (_, row) => toCurrency(row.not_accounting_amount),
      },
      {
        title: '会员',
        children: [
          {
            title: '结果',
            render: (_, row) => <ColorText num={row.result + row.fee} />,
          },
          {
            title: '活动彩金',
            render: (_, row) => <ColorText num={row.activity_bonus} />,
          },
          {
            title: '服务费',
            render: (_, row) => <ColorText num={row.fee} />,
          },
        ],
      },
      {
        title: '代理',
        children: [
          {
            title: '结果',
            render: (_, row) => <ColorText num={row.agent_result} />,
          },
          {
            title: '退水',
            render: (_, row) => <ColorText num={row.agent_rebate} />,
          },
          {
            title: '负担退水',
            render: (_, row) => <ColorText num={row.agent_share_rebate} />,
          },
          {
            title: '服务费',
            render: (_, row) => <ColorText num={row.agent_fee} />,
          },
        ],
      },
    ],
    [],
  )
  return (
    <>
      <HStack>
        {router?.query?.pid && (
          <TipIconButton
            label="回上页"
            icon={<HiOutlineArrowLeft />}
            onClick={() => router.back()}
            colorScheme="brand"
            bgColor="gray.600"
            mb="10px"
          />
        )}
        <ParentTree tree={parentTree} />
      </HStack>
      {/* {summary && (
        <TableSummary>
          <TableSummaryItem label="总笔数" num={summary?.count} decimal={0} />
          <TableSummaryItem label="下注金额" num={summary?.amount} />
          <TableSummaryItem label="累计流水" num={summary?.valid_amount} />
          <TableSummaryItem label="退水">
            <ColorText num={summary?.rebate} />
          </TableSummaryItem>
          <TableSummaryItem label="手续费">
            <ColorText num={summary?.fee} />
          </TableSummaryItem>
          <TableSummaryItem label="输赢结果">
            <ColorText num={summary?.result + summary?.fee} />
          </TableSummaryItem>
        </TableSummary>
      )} */}
      <BasicTable
        columns={columns}
        data={list}
        summary={
          // summary &&
          () => {
            return (
              <>
                {/* <Table.Summary.Row>
                  <Table.Summary.Cell index={0}></Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>下注笔数</Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>总注额</Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>有效注额</Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>累计输额</Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>累计赢额</Table.Summary.Cell>
                  <Table.Summary.Cell index={6}>未过帐注额</Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    <ColorText num={summary?.result + summary?.fee} />
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8}>
                    <ColorText num={summary?.rebate} />
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={9}>
                    <ColorText num={summary?.fee} />
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={10}>
                    <ColorText num={summary?.agent_result} />
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={11}>
                    <ColorText num={summary?.agent_rebate} />
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={12}>
                    <ColorText num={summary?.agent_share_rebate} />
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={13}>
                    <ColorText num={summary?.agent_fee} />
                  </Table.Summary.Cell>
                </Table.Summary.Row> */}
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>
                    <Text textAlign="right">跨页统计</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    {toCurrency(summary?.count, 0)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    {toCurrency(summary?.amount, 0)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    {toCurrency(summary?.valid_amount, 0)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>
                    {toCurrency(summary?.lose_result, 0)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>
                    {toCurrency(summary?.win_result, 0)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6}>
                    {toCurrency(summary?.not_accounting_amount, 0)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    <ColorText num={summary?.result + summary?.fee} />
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8}>
                    <ColorText num={summary?.rebate} />
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={9}>
                    <ColorText num={summary?.fee} />
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={10}>
                    <ColorText num={summary?.agent_result} />
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={11}>
                    <ColorText num={summary?.agent_rebate} />
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={12}>
                    <ColorText num={summary?.agent_share_rebate} />
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={13}>
                    <ColorText num={summary?.agent_fee} />
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            )
          }
        }
      />
    </>
  )
}

export default TableData
