import BasicTable from '@/components/BasicTable'
import menu from '@/lib/menu'
import { MemberActivity } from '@/types/api/MemberActivity'
import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import { ColumnsType } from 'antd/lib/table'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

function TableData({ list }: { list: MemberActivity[] }) {
  const { toCurrency } = useTransfer()
  const router = useRouter()
  const columns: ColumnsType<MemberActivity> = useMemo(
    () => [
      {
        title: '帳號/暱稱',
        fixed: true,
        render: (_, row) => {
          if (row.agent_count > 0) {
            return (
              <Link
                href={{
                  pathname: menu.report.pages.memberActivity.path,
                  query: { pid: row.id },
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
        title: '首次充值(筆)',
        render: (_, row) => toCurrency(row.first_deposit_count, 0),
      },
      {
        title: '首次充值加總(元)',
        render: (_, row) => toCurrency(row.first_deposit_sum),
      },
      {
        title: '再次充值(筆)',
        render: (_, row) => toCurrency(row.not_first_deposit_count, 0),
      },
      {
        title: '再次充值加總(元)',
        render: (_, row) => toCurrency(row.not_first_deposit_sum),
      },
      {
        title: '總充值(筆)',
        render: (_, row) => toCurrency(row.deposit_count, 0),
      },
      {
        title: '總充值加總(元)',
        render: (_, row) => toCurrency(row.deposit_sum),
      },
      {
        title: '首次提現(筆)',
        render: (_, row) => toCurrency(row.first_withdraw_count, 0),
      },
      {
        title: '首次提現加總(元)',
        render: (_, row) => toCurrency(row.first_withdraw_sum),
      },
      {
        title: '再次提現(筆)',
        render: (_, row) => toCurrency(row.not_first_withdraw_count, 0),
      },
      {
        title: '再次提現加總(元)',
        render: (_, row) => toCurrency(row.not_first_withdraw_sum),
      },
      {
        title: '總提現(筆)',
        render: (_, row) => toCurrency(row.withdraw_count, 0),
      },
      {
        title: '總提現加總(元)',
        render: (_, row) => toCurrency(row.withdraw_sum),
      },
      {
        title: '總登入人數',
        render: (_, row) => toCurrency(row.login_count, 0),
      },
      {
        title: '註冊人數',
        render: (_, row) => toCurrency(row.register_count, 0),
      },
    ],
    [],
  )
  return (
    <>
      {router?.query?.pid && (
        <TipIconButton
          label="回上頁"
          icon={<HiOutlineArrowLeft />}
          onClick={() => router.back()}
          colorScheme="brand"
          bgColor="gray.600"
          mb="10px"
        />
      )}
      <BasicTable columns={columns} data={list} />
    </>
  )
}

export default TableData
