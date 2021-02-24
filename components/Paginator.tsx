import { usePaginateContext } from '@/context/PaginateContext'
import { Box, BoxProps } from '@chakra-ui/layout'
import { Pagination } from 'antd'
import React from 'react'

function Paginator(props: BoxProps) {
  const {
    totalCount,
    page,
    perpage,
    onPageChanged,
    onPerpageChanged,
  } = usePaginateContext()
  return (
    <Box {...props}>
      <Pagination
        current={page}
        total={totalCount}
        pageSize={perpage}
        onChange={onPageChanged}
        onShowSizeChange={onPerpageChanged}
      />
    </Box>
  )
}

export default Paginator
